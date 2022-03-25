// yarn test test/bridge.ts
import { expect } from "chai";
import { ethers } from "hardhat";
const BridgeABI = require('../artifacts/contracts/mixin/bridge.sol/Bridge.json');

describe("Bridge", function () {
  it("Test for bridge", async function () {
    const [deployer] = await ethers.getSigners();
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy();
    await bridge.deployed();

    await bridge.bind("0xa67750dd7b76FeCC1825A77a88fF30850F08a55B");
    const bridgeAbi = new ethers.Contract(bridge.address, BridgeABI.abi, deployer);
    expect(await bridgeAbi.bridges(deployer.address)).equal("0xa67750dd7b76FeCC1825A77a88fF30850F08a55B");
  });
});
