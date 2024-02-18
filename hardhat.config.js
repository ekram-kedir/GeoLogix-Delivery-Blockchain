require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    artifacts: './contracts/arteifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337,
    }
  }
};
