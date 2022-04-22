import { ethers } from "hardhat";
const UniswapV2FactoryABI = require('../artifacts/contracts/uniswap/UniswapV2Factory.sol/UniswapV2Factory.json');
const UniswapV2Router02ABI = require('../artifacts/contracts/periphery/UniswapV2Router02.sol/UniswapV2Router02.json');

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
  const factoryAbi = new ethers.Contract(factory.address, UniswapV2FactoryABI.abi, deployer);
  console.log("UniswapV2Factory allPairs", await factoryAbi.allPairs('0x02'));
  console.log("UniswapV2Factory getPair", await factoryAbi.getPair("0xd6684C8Dd9c57C2c33c37Fe5e06d7D2fC0643F09", "0x6529C16A86432D7566701dF2A868c63cE0453FB7"));

  const UniswapV2Router02 = await ethers.getContractFactory(
    "UniswapV2Router02"
  );
  // Deploy router
  // const router = await UniswapV2Router02.deploy(factory.address, deployer.address);
  // await router.deployed();

  // Attach router exmaple
  const router = await UniswapV2Router02.attach("0x0bBe54e2B11D6671238EDB6FB3eD83f73A1ca3dF");
  console.log("UniswapV2Router02 address: " + router.address);
  const routerAbi = new ethers.Contract(router.address, UniswapV2Router02ABI.abi, deployer);
  console.log("UniswapV2Router02 getAmountsOut", await routerAbi.getAmountsOut("0x2710",["0xDF7d6a8b29C6C059d3B6fD0E1E4EBdE776590A9e", "0xd6684C8Dd9c57C2c33c37Fe5e06d7D2fC0643F09"]));

  const UniswapMVMRouter = await ethers.getContractFactory("UniswapMVMRouter");
  // Deploy mvm router
  // const mvmRouter = await UniswapMVMRouter.deploy(router.address);
  // await mvmRouter.deployed()

  // Attach mvm router exmaple
  const mvmRouter = await UniswapMVMRouter.attach("0xBEB55554605314B7ADd09C8344FDAF1Ba81F74A5");
  console.log("UniswapMVMRouter address: " + mvmRouter.address);
  // roay 69b2d237-1eb2-3b6c-8e1d-3876e507b263
  // roay 0xbeb5ecE163ee3fc221Aba1453CA19C423C924326
  // cnb 965e5c6e-434c-3fa9-b780-c50f43cd955c
  // cnb 0xe07d1bb9ed65b200b4684a0f3b9268c638c87e98
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
