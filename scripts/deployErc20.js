const { ethers } = require("hardhat");

const deploy = async () => {
  const Token = await ethers.getContractFactory("MK");

  const token = await Token.deploy();

  console.log("Token address: ", token.address);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("deploy error: ", error);
    process.exit(1);
  });

// Deployed Contract in Rinkeby Test Network: 0x9533bEb51C5E1e9E31E600ACD5ba6824af0a58EF
