const { ethers } = require("hardhat");

const deploy = async () => {
  const FNFT = await ethers.getContractFactory("MyNFT");

  const nftInstance = await FNFT.deploy();

  console.log("First NFT address: ", nftInstance.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("deploy error: ", error);
    process.exit(1);
  });

// Deployed Contract in Rinkeby Test Network: 0xF75a4E6409A952D1544Bccb4b4a4D2E07703d5DD
