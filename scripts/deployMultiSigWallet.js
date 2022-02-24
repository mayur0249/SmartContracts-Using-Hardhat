const { ethers } = require("hardhat");

const deploy = async () => {
  const [deployer] = await ethers.getSigners();

  const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");

  const MultiSigWalletInstance = await MultiSigWallet.deploy(
    [
      "0xd02aa2EFaEd5D81f2495213721b9D5bc1110d934",
      "0x841eDda6A2Bfb982C3837f7849e1de2a8D9d5d00",
      "0xf673Ce48dcd0140C0AAb00B28163CAEdC3ef94F0",
    ],
    "5"
  );

  console.log(
    "Deployed MultiSigWallet Contract Address: ",
    MultiSigWalletInstance.address
  );
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("deploy error: ", error);
    process.exit(1);
  });
