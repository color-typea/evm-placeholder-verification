
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import 'hardhat-deploy-ethers';
import 'hardhat-contract-sizer';
import { config as dotEnvConfig } from "dotenv";

import './tasks/verify-zkllvm-output'

const dotenvConf = dotEnvConfig();

if (dotenvConf.error) {
  console.error('Error loading .env file:', dotenvConf.error);
  process.exit(1); // Exit the application with an error code
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      blockGasLimit: 100_000_000,
    },
    // sepolia: {
    //   url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHEMY_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY]
    // },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli/${process.env.GOERLI_ANKR_API_ID}`,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  allowUnlimitedContractSize: true,
};
