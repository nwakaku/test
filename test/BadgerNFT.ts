import { ethers } from "hardhat";
import { expect } from "chai";

describe("BadgerNFT", function () {
  let badgerNFT: any;
  let owner: any;
  let otherAccount: any;

  beforeEach(async function () {
    const BadgerNFT = await ethers.getContractFactory("BadgerNFT");
    badgerNFT = await BadgerNFT.deploy();
    [owner, otherAccount] = await ethers.getSigners();
  });

  it("should mint new NFTs", async function () {
    await badgerNFT.safeMint(owner.address, "URI_1");
    await badgerNFT.safeMint(owner.address, "URI_2");

    const ownerBalance = await badgerNFT.balanceOf(owner.address);
    expect(ownerBalance).to.equal(2);
  });

  it("should transfer an NFT", async function () {
    await badgerNFT.safeMint(owner.address, "URI");

    await badgerNFT.transferFrom(owner.address, otherAccount.address, 0);

    const ownerBalance = await badgerNFT.balanceOf(owner.address);
    const otherAccountBalance = await badgerNFT.balanceOf(otherAccount.address);
    expect(ownerBalance).to.equal(0);
    expect(otherAccountBalance).to.equal(1);
  });
});
