// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../src/Estuary.sol";
import "solady/tokens/ERC20.sol";

contract MockERC20 is ERC20 {
    function name() public view override returns (string memory) {
        return "MockERC20";
    }
    function symbol() public view override returns (string memory) {
        return "MERC20";
    }
}

contract EstuaryTest is Test {
    Estuary estuary;

    function setUp() public {
        estuary = new Estuary();
    }

    function test_sanity() public {
        assertEq(estuary.nextId(), 0);
    }
}