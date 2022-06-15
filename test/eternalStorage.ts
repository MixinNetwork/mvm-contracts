import { expect } from "chai";
import { ethers } from "hardhat";
const StorageABI = require('../artifacts/contracts/mixin/EternalStorage.sol/EternalStorage.json');

describe("EternalStorage", function () {
  it("Tests for EternalStorage", async () => {
    const EternalStorage = await ethers.getContractFactory("EternalStorage");
    const storage = await EternalStorage.deploy();
    await storage.deployed();

    const value = ethers.utils.solidityPack(['string'], ['0x1234']);
    let key = ethers.utils.keccak256(value);
    await storage.setStringValue(key, '0x1234');
    expect(await storage.getStringValue(key)).to.equal('0x1234');
    expect(await storage.getStringValue(key)).to.not.equal('0x123456');

    key = ethers.utils.keccak256('0x1234');
    await storage.setBytesValue(key, '0x1234');
    expect(await storage.getBytesValue(key)).to.equal('0x1234');
    expect(await storage.getBytesValue(key)).to.not.equal('0x123456');
  });
});
