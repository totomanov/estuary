// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "./interfaces/IERC20.sol";
import {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";

contract Estuary {
    uint256 public nextId;
    mapping(uint256 id => Stream stream) public streams;

    error InvalidRecipient(address recipient);
    error ZeroAmount();
    error ZeroAmountTransferred();

    event StreamCreated(uint256 id, Stream stream);

    struct Stream {
        address sponsor;
        address recipient;
        address token;
        uint192 amount;
        uint64 start;
        uint64 end;
        uint64 lastClaim;
    }

    function createStream(address recipient, address token, uint192 amount, uint64 end) external returns (uint256) {
        if (recipient == address(0) || recipient == address(this)) revert InvalidRecipient(recipient);
        if (amount == 0) revert ZeroAmount();

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
            end: end,
            lastClaim: 0
        });
        uint256 id = nextId++;
        streams[id] = stream;

        emit StreamCreated(id, stream);

        return id;
    }
}
