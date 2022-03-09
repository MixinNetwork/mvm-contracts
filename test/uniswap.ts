import { expect } from "chai";
import { ethers } from "hardhat";

describe("Uniswap", function () {
  it("Tests for uniswap v2 factory", async () => {
    const [deployer] = await ethers.getSigners();

    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await UniswapV2Factory.deploy(deployer.address);
    expect(await factory.feeTo()).to.equal("0x0000000000000000000000000000000000000000");
    expect(await factory.feeToSetter()).to.equal(deployer.address);
  });
});
