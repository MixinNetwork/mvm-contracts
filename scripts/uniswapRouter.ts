import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
  const router = await UniswapV2Router02.attach(
    "0x2b60ce6462EDFD5E387f85eF41413aecD1951470"
  );
  // const router = await UniswapV2Router02.deploy("0xd66c174a322eF2Ca6EabDFECaFbB2826Ccfd5cbf", deployer.address);
  console.log("UniswapV2Router02 address: " + router.address);

  const UniswapMVMRouter = await ethers.getContractFactory("UniswapMVMRouter");
  const mvmRouter = await UniswapMVMRouter.attach(
    "0x2b60ce6462EDFD5E387f85eF41413aecD1951470"
  );
  // const mvmRouter = await UniswapMVMRouter.deploy(router.address);
  console.log("UniswapMVMRouter address: " + router.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
