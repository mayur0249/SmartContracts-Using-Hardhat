require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.INFURA_RINKEBY_API,
      chainId: 4,
      gasPrice: 30000000000,
      gas: 6000000,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      timeout: 1000000,
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
    },
  },
  verify: {
    constructorArguments: [
      "1000000000000000000",
      "0xd02aa2EFaEd5D81f2495213721b9D5bc1110d934",
    ],
  },
};
