// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "./interfaces/IERC20.sol";
import {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";

contract Estuary {
    uint256 public nextId;
    mapping(uint256 id => Stream stream) public streams;

    error CallerNotRecipient(uint256 id);
    error CallerNotSponsor(uint256 id);
    error InvalidRecipient(address recipient);
    error InvalidDuration(uint64 duration);
    error StreamDoesNotExist(uint256 id);
    error StreamAlreadyCancelled(uint256 id);
    error StreamExpired(uint256 id);
    error ZeroAmount();
    error ZeroAmountTransferred();

    event StreamCreated(uint256 id, Stream stream);
    event StreamCancelled(uint256 id);

    struct Stream {
        address sponsor;
        address recipient;
        address token;
        uint192 amount;
        uint64 start;
        uint64 end;
        uint64 lastClaim;
    }

    function createStream(address recipient, address token, uint192 amount, uint64 duration) external returns (uint256) {
        if (recipient == address(0) || recipient == address(this)) revert InvalidRecipient(recipient);
        if (amount == 0) revert ZeroAmount();
        if (duration == 0) revert InvalidDuration(duration);

        uint256 balanceBefore = IERC20(token).balanceOf(address(this));
        SafeTransferLib.safeTransferFrom(token, msg.sender, address(this), amount);
        uint256 balanceAfter = IERC20(token).balanceOf(address(this));

        uint192 transferredAmount = uint192(balanceAfter - balanceBefore);
        if (transferredAmount == 0) revert ZeroAmountTransferred();

        Stream memory stream = Stream({
            sponsor: msg.sender,
            recipient: recipient,
            token: token,
            amount: amount,
            start: uint64(block.timestamp),
            end: uint64(block.timestamp) + duration,
            lastClaim: 0
        });
        uint256 id = nextId++;
        streams[id] = stream;

        emit StreamCreated(id, stream);

        return id;
    }

    function claimStream(uint256 id) external {
        Stream storage stream = streams[id];
        if (stream.sponsor == address(0)) revert StreamDoesNotExist(id);
        if (stream.recipient != msg.sender) revert CallerNotRecipient(id);

        uint256 claimable = getClaimable(id);

        SafeTransferLib.safeTransfer(stream.token, msg.sender, stream.amount);
        stream.lastClaim = uint64(block.timestamp);
    }

    function getClaimable(uint256 id) public view returns (uint256) {
        Stream storage stream = streams[id];
        if (block.timestamp <= stream.start) return 0;
        if (block.timestamp == stream.lastClaim) return 0;

        uint256 claimed = stream.amount * (stream.lastClaim - stream.start) / (stream.end - stream.start);
        if (block.timestamp >= stream.end) {
            return stream.amount - claimed;
        }

        uint256 cumulative = stream.amount * (block.timestamp - stream.start) / (stream.end - stream.start);

        return cumulative - claimed;
    }
}
