import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");

  // Attach factory
  // const factory = await UniswapV2Factory.attach("factory address");

  // Deploy factory
  const factory = await UniswapV2Factory.deploy(deployer.address);
  console.log("UniswapV2Factory address: " + factory.address);

  const UniswapV2Router02 = await ethers.getContractFactory(
    "UniswapV2Router02"
  );

  // Attach router
  // const router = await UniswapV2Router02.attach("router address");

  // Deploy router
  const router = await UniswapV2Router02.deploy(
    factory.address,
    deployer.address
  );
  console.log("UniswapV2Router02 address: " + router.address);

  const UniswapMVMRouter = await ethers.getContractFactory("UniswapMVMRouter");

  // Attach mvm router
  // const mvmRouter = await UniswapMVMRouter.attach("mvm router address");

  // Deploy mvm router
  const mvmRouter = await UniswapMVMRouter.deploy(router.address);
  console.log("UniswapMVMRouter address: " + mvmRouter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
