/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-foundry");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const proxy_url = 'https://devnet.neonevm.org';
const network_id = 245022926;

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: 'neonlabs',
  networks: {
    neonlabs: {
      url: proxy_url,
      accounts: [process.env.PRIVATE_KEY],
      network_id: network_id,
      chainId: network_id,
      allowUnlimitedContractSize: false,
      timeout: 1000000,
      isFork: true
    }
  }
};
