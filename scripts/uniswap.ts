import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const factory = await UniswapV2Factory.attach(
    "0xd66c174a322eF2Ca6EabDFECaFbB2826Ccfd5cbf"
  );
  // const factory = await UniswapV2Factory.deploy(deployer.address);
  console.log("UniswapV2Factory address: " + factory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
