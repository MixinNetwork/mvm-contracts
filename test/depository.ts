import { expect } from "chai";
import { ethers } from "hardhat";
const DepositoryABI = require('../artifacts/contracts/mixin/depository.sol/Depository.json');

describe("Depository", function () {
  it("Tests for depository", async () => {
    const [deployer] = await ethers.getSigners();
    const Depository = await ethers.getContractFactory("Depository");
    const depository = await Depository.deploy();
    await depository.deployed();
    const depositoryAbi = new ethers.Contract(depository.address, DepositoryABI.abi, deployer);

    let id = ethers.utils.keccak256("0xa67750dd7b76FeCC1825A77a88fF30");
    await expect(
      depository.persistWriteData(id, "0xa67750dd7b76FeCC1825A77a88fF30850F08a55B")
    ).to.be.revertedWith("invalid _id or _raw");
    expect(await depositoryAbi.shelves(id)).to.equal("0x");

    id = ethers.utils.keccak256("0xa67750dd7b76FeCC1825A77a88fF30850F08a55B");
    await depository.persistWriteData(id, "0xa67750dd7b76FeCC1825A77a88fF30850F08a55B");
    expect(await depositoryAbi.shelves(id)).to.equal("0xa67750dd7b76fecc1825a77a88ff30850f08a55b");

    id = ethers.utils.keccak256("0xa67750dd7b76FeCC1825A77a88fF30");
    expect(await depositoryAbi.shelves(id)).to.equal("0x");
  });
});
