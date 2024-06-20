require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: 'sepolia',
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './src/contracts',
    artifacts: './src/abis',
  },
  mocha: {
    timeout: 40000,
  },
}
