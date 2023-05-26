import { ethers } from "hardhat";


async function main() {

  const BEP = await ethers.getContractFactory("BEP201");
  const bep = await BEP.deploy();

  await bep.deployed();

  console.log(
    `contract Address - ${bep.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
