const { ethers } = require("hardhat");

const deploy = async () => {
  const crowdFunding = await ethers.getContractFactory("CrowdFunding");

  const crowdFundingInstance = await crowdFunding.deploy(
    "1000000000000000000",
    "0xd02aa2EFaEd5D81f2495213721b9D5bc1110d934"
  );

  console.log(
    "Deployed crowdFunding Contract Address: ",
    crowdFundingInstance.address
  );
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("deploy error: ", error);
    process.exit(1);
  });

// Deployed Contract Address on Rinkeby Test Network: 0x069b841E2C06d4eb4299BF98d27fc32f17fb23A6
