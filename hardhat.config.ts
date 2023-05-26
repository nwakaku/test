import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

const bscApi = "FV65IMBPBRVEBWHBYZEDBMY1ZQYTWH6QHH"


const config: HardhatUserConfig = {
  solidity: "0.8.18",
  
  // networks: {
  //   testnet: {
  //     url: "https://data-seed-prebsc-1-s1.binance.org:8545",
  //     chainId: 97,
  //     gasPrice: 20000000000,
  //     accounts: ["2681881ef2ddd24cd569a5e5df1f34ac3f765f37ad7cffce76a9a7ee3c1fe7b8"],
  //   },
  // },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: bscApi
  },
};

export default config;
