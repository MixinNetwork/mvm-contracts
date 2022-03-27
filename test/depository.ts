import { expect } from "chai";
import { ethers } from "hardhat";

describe("Depository", function () {
  it("Tests for depository", async () => {
    const Depository = await ethers.getContractFactory("Depository");
    const depository = await Depository.deploy();
    await depository.deployed();

    let id = ethers.utils.keccak256("0xa67750dd7b76FeCC1825A77a88fF30");
    await expect(
      depository.persistWriteData(id, "0xa67750dd7b76FeCC1825A77a88fF30850F08a55B")
    ).to.be.revertedWith("invalid _id or _raw");
    expect(await depository.persistReadData(id)).to.equal("0x");

    id = ethers.utils.keccak256("0xa67750dd7b76FeCC1825A77a88fF30850F08a55B");
    await depository.persistWriteData(id, "0xa67750dd7b76FeCC1825A77a88fF30850F08a55B");
    expect(await depository.persistReadData(id)).to.equal("0xa67750dd7b76fecc1825a77a88ff30850f08a55b");

    id = ethers.utils.keccak256("0xa67750dd7b76FeCC1825A77a88fF30");
    expect(await depository.persistReadData(id)).to.equal("0x");
  });
});
