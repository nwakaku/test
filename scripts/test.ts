import { Address } from 'cluster';
import { ethers } from 'hardhat';

async function createContractObject() {

    let badgerCoin: any;
    let owner: any;
    let otherAccount: any;

    const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
    badgerCoin = await BadgerCoin.deploy();
    // badgerCoin = "0x475211862a6a02C68E6159AA8393178f3b26bC69";
    [owner, otherAccount] = await ethers.getSigners();

    return [badgerCoin, owner, otherAccount];
}

// Example: Call the `balanceOf` method
async function getBalanceOf(owner: string): Promise<string> {
  const [badgerCoin]  = await createContractObject();
  const balance = await badgerCoin.balanceOf(owner);
  return balance.toString();
}

// Example: Call the `transfer` method
async function transferTokens(owner:Address ,otherAccount:Address, amount: string): Promise<void> {
  // Signer with a connected wallet
  const [badgerCoin]  = await createContractObject();

  // Send the transaction to the ERC20 contract
  const transaction = await badgerCoin.connect(owner).transfer(otherAccount, amount);

  // Wait for the transaction to be mined
  await transaction.wait();
}

// Usage example
async function main() {

  const [badgerCoin, owner, otherAccount]  = await createContractObject();
  const balance = await getBalanceOf(owner.address);
  console.log('Account balance:', balance);

  const amount = '1000';
  await transferTokens(owner,otherAccount.address, amount);
  console.log('Tokens transferred successfully!');
}

// Run the code
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
