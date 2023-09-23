// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../src/Estuary.sol";
import "solmate/tokens/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20(_name, _symbol, _decimals) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract EstuaryTest is Test {
    address constant alice = address(0x100a);
    address constant bob = address(0x100b);
    address constant charlie = address(0x100c);
    
    MockERC20 tokenA;
    MockERC20 tokenB;
    MockERC20 tokenC;

    Estuary estuary;

    function setUp() public {
        estuary = new Estuary();
        tokenA = new MockERC20("Token A", "TKNA", 18);
        tokenB = new MockERC20("Token B", "TKNB", 18);
        tokenC = new MockERC20("Token C", "TKNC", 6);

        tokenA.mint(alice, 1_000_000e18);
        tokenA.mint(bob, 1_000_000e18);
        tokenA.mint(charlie, 1_000_000e18);

        tokenB.mint(alice, 1_000_000e18);
        tokenB.mint(bob, 1_000_000e18);
        tokenB.mint(charlie, 1_000_000e18);

        tokenC.mint(alice, 1_000_000e6);
        tokenC.mint(bob, 1_000_000e6);
        tokenC.mint(charlie, 1_000_000e6);

        vm.startPrank(alice);
        tokenA.approve(address(estuary), type(uint256).max);
        tokenB.approve(address(estuary), type(uint256).max);
        tokenC.approve(address(estuary), type(uint256).max);

        vm.startPrank(bob);
        tokenA.approve(address(estuary), type(uint256).max);
        tokenB.approve(address(estuary), type(uint256).max);
        tokenC.approve(address(estuary), type(uint256).max);

        vm.startPrank(charlie);
        tokenA.approve(address(estuary), type(uint256).max);
        tokenB.approve(address(estuary), type(uint256).max);
        tokenC.approve(address(estuary), type(uint256).max);

        vm.stopPrank();
    }

    function test_sanity() public {
        assertEq(estuary.nextId(), uint256(0));
    }

    function test_createStream() public {
        vm.prank(alice);
        uint64 duration = 7 * 86400;
        uint256 id = estuary.createStream(
            bob,
            address(tokenA),
            100e18,
            duration
        );

        (
            address sponsor,
            address recipient,
            address token,
            uint192 amount,
            uint64 start,
            uint64 end,
            uint64 lastClaim
        ) = estuary.streams(id);

        assertEq(sponsor, alice);
        assertEq(recipient, bob);
        assertEq(token, address(tokenA));
        assertEq(amount, 100e18);
        assertEq(start, block.timestamp);
        assertEq(end, block.timestamp + duration);
        assertEq(lastClaim, 0);
    }

    function test_e2e() public {
        vm.prank(alice);
        uint64 duration = 10 * 86400;
        uint256 id = estuary.createStream(
            bob,
            address(tokenA),
            100e18,
            duration
        );

        assertEq(estuary.getClaimable(id), 0);

        skip(duration / 10);
        assertEq(estuary.getClaimable(id), 10e18);

        skip(duration / 10);
        assertEq(estuary.getClaimable(id), 20e18);

        vm.startPrank(bob);
        uint balanceBefore = tokenA.balanceOf(bob);
        estuary.claimStream(id);
        assertEq(tokenA.balanceOf(bob), balanceBefore + 20e18);

        assertEq(estuary.getClaimable(id), 0);

        skip(duration / 10);
        assertEq(estuary.getClaimable(id), 10e18);

        balanceBefore = tokenA.balanceOf(bob);
        estuary.claimStream(id);
        assertEq(tokenA.balanceOf(bob), balanceBefore + 10e18);

        assertEq(estuary.getClaimable(id), 0);

        skip(duration / 10);
        assertEq(estuary.getClaimable(id), 10e18);

        skip(duration / 10);
        assertEq(estuary.getClaimable(id), 20e18);

        skip(duration / 2);
        assertEq(estuary.getClaimable(id), 70e18);

        skip(duration);
        assertEq(estuary.getClaimable(id), 70e18);

        balanceBefore = tokenA.balanceOf(bob);
        estuary.claimStream(id);
        assertEq(tokenA.balanceOf(bob), balanceBefore + 70e18);

        assertEq(estuary.getClaimable(id), 0);
        skip(duration);
        assertEq(estuary.getClaimable(id), 0);

    }

}