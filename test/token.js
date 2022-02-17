const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", () => {
    it("checks if owner is valid", async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("checks if total supply of tokens is with owner", async () => {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", () => {
    it("checks token transfer between accounts", async () => {
      await hardhatToken.transfer(addr1.address, 5); // owner to addr1.address

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(5);

      await hardhatToken.connect(addr1).transfer(addr2.address, 5);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(5);
    });

    it("checks if it fails when sender does not have enough tokens", async () => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("checks if balance updates after transfers", async () => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await hardhatToken.transfer(addr1.address, 5);
      await hardhatToken.transfer(addr2.address, 10);

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance - 15
      );

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);

      expect(addr1Balance).to.equal(5);
      expect(addr2Balance).to.equal(10);
    });
  });
});

// describe("Token Contract", () => {
//   it("should assign the total supply of tokens to the owner", async () => {
//     const [owner] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Token"); //Contract Instance

//     const hardhatToken = await Token.deploy(); // deploying contract

//     const ownerBalance = await hardhatToken.balanceOf(owner.address); //ownerBalance = 10000

//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });

//   it("should transfer tokens between accounts", async () => {
//     const [owner, addr1, addr2] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Token"); //Contract Instance

//     const hardhatToken = await Token.deploy(); // deploying contract

//     await hardhatToken.transfer(addr1.address, 10); //Transfer 10 tokens from owner to addr1
//     expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

//     await hardhatToken.connect(addr1).transfer(addr2.address, 5); //Transfer 5 tokens from addr1 to addr2
//     expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
//   });
// });
