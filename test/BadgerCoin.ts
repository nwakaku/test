import { ethers } from "hardhat";
import { expect } from "chai";

describe("BadgerCoin", function () {
  let badgerCoin: any;
  let owner: any;
  let otherAccount: any;

  beforeEach(async function () {
    const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
    badgerCoin = await BadgerCoin.deploy();
    [owner, otherAccount] = await ethers.getSigners();
  });

  it("The total supply is initially 1000000", async function () {

      const ownerBalance = await badgerCoin.balanceOf(owner.address);
       const expectedTotalSupply = ethers.BigNumber.from("1000000").mul(ethers.BigNumber.from("10").pow(await badgerCoin.decimals()));
    expect(ownerBalance).to.equal(expectedTotalSupply);
  });

  it("That the number of decimals is 18", async function () {
      
      const decimal = await badgerCoin.decimals()
    expect(decimal).to.equal(18);
  });
    
    it(" The balanceOf function returns the correct result", async function () {
      
        const bal = await badgerCoin.balanceOf(owner.address);
        const expectedTotalSupply = ethers.BigNumber.from("1000000").mul(ethers.BigNumber.from("10").pow(await badgerCoin.decimals()));

    expect(bal).to.equal(expectedTotalSupply);
  });
  it("the transfer function works correctly", async function () {
      
      await badgerCoin.transfer(otherAccount.address, 100);
      const balOther = await badgerCoin.balanceOf(otherAccount.address);

    expect(balOther).to.equal(100);
  });
    it("an error is produced if a transfer is created with an insufficient balance", async function () {
      
        const bal = await badgerCoin.balanceOf(owner.address);
        const transferAmount = bal.add(ethers.BigNumber.from(1));
      
        await expect(badgerCoin.transfer(owner.address, transferAmount)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance")

  });
    
});
