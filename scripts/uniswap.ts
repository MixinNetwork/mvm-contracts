import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");

  // Deploy factory
  // const factory = await UniswapV2Factory.deploy(deployer.address);
  // await factory.deployed();

  // Attach factory exmaple
  const factory = await UniswapV2Factory.attach("0xd66c174a322eF2Ca6EabDFECaFbB2826Ccfd5cbf");
  console.log("UniswapV2Factory address: " + factory.address);

  const UniswapV2Router02 = await ethers.getContractFactory(
    "UniswapV2Router02"
  );
  // Deploy router
  // const router = await UniswapV2Router02.deploy(factory.address, deployer.address);
  // await router.deployed();

  // Attach router exmaple
  const router = await UniswapV2Router02.attach("0x0bBe54e2B11D6671238EDB6FB3eD83f73A1ca3dF");
  console.log("UniswapV2Router02 address: " + router.address);

  const UniswapMVMRouter = await ethers.getContractFactory("UniswapMVMRouter");
  // Deploy mvm router
  // const mvmRouter = await UniswapMVMRouter.deploy(router.address);
  // await mvmRouter.deployed()

  // Attach mvm router exmaple
  const mvmRouter = await UniswapMVMRouter.attach("0xBEB55554605314B7ADd09C8344FDAF1Ba81F74A5");
  console.log("UniswapMVMRouter address: " + mvmRouter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
