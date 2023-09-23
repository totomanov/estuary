// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "solady/tokens/ERC20.sol";
import "forge-std/Script.sol";
import "../src/Estuary.sol";


contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Estuary estuary = new Estuary();
        vm.stopBroadcast();
    }
}