require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  defaultNetwork: "basesepolia",
  networks: {
    basesepolia: {
      url: process.env.RPC_URL, // e.g., your Base Sepolia RPC URL
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.20",
};
