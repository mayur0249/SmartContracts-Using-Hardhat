const { ethers } = require("hardhat");

const deploy = async () => {
  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("Token");

  const token = await Token.deploy();

  console.log("Token address: ", token.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("deploy error: ", error);
    process.exit(1);
  });

// Deployed Contract in Rinkeby Test Network: 0x009E1d0368B3AB07B237B9950805BBfd7ee62BB1
