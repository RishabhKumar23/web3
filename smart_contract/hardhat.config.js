//https://eth-sepolia.g.alchemy.com/v2/ZXpZxouSK85T0kXHfirsB-goNlfPOzge
// Anomiclabs/hardhat-waffle --> is a plugin to build smart contract using waffle in hardhat
// require('@Anomiclabs/hardhat-waffle');
/*NOTE -  i am using sepolia test network */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/ZXpZxouSK85T0kXHfirsB-goNlfPOzge',
      accounts: ['9caa331dd9979b0a00fa1bfbc70a750ed7bf705332548fe7622ca2c2fbe2bcd0']
    }
  }
}