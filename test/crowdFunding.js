const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFunding Contract", () => {
  let accounts;
  let factory;
  let campaignAddress;
  let campaign;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    factory = await ethers.getContractFactory("Factory");
    factoryInstance = factory.deploy();

    await factoryInstance.createCampaign(100);

    [campaignAddress] = await factoryInstance.getDeployedCampaigns();

    // campaign = await new ethers.Contract(
    //   campaignAddress,
    //   abi,
    //   signerOrProvider
    // );
  });
});
