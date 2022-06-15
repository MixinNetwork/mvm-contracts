import { ethers } from "hardhat";
const UniswapV2FactoryABI = require('../artifacts/contracts/uniswap/UniswapV2Factory.sol/UniswapV2Factory.json');
const UniswapPairABI = require('../artifacts/contracts/uniswap/UniswapV2Pair.sol/UniswapV2Pair.json');
const UniswapV2Router02ABI = require('../artifacts/contracts/periphery/UniswapV2Router02.sol/UniswapV2Router02.json');
const UniswapMVMRouterABI = require('../artifacts/contracts/periphery/UniswapMVMRouter.sol/UniswapMVMRouter.json');

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
  // fetch all uniswap pairs
  console.log("UniswapV2Factory allPairs", await factoryAbi.allPairs('0x02'));
  // fetch a uniswap pair by tokenA and tokenB
  console.log("UniswapV2Factory getPair", await factoryAbi.getPair("0xd6684C8Dd9c57C2c33c37Fe5e06d7D2fC0643F09", "0xDF7d6a8b29C6C059d3B6fD0E1E4EBdE776590A9e"));
  const pair = new ethers.Contract("0xACe47661455660656E0CC9001F34Ff6870ac01fF", UniswapPairABI.abi, deployer);
  const reserves = await pair.getReserves();
  // fetch a uniswap pair reserves
  console.log("UniswapV2Pair getReserves", reserves[0], reserves[1], reserves);

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
  const mvmRouter = await UniswapMVMRouter.attach("0xa19e2D55765Cd2f2Dc02d5c872eA9fbF76D59515");
  console.log("UniswapMVMRouter address: " + mvmRouter.address);
  const mvmRouterAbi = new ethers.Contract(mvmRouter.address, UniswapMVMRouterABI.abi, deployer);
  console.log("UniswapMVMRouter cnb nxc pair: ", await mvmRouterAbi.fetchPair("0x155bDfAb24f07630C27a3F31634B33F94eC4A634", "0xCc4623795F07CaFf65069704D5008778921456a5"));
  console.log("UniswapMVMRouter operations:", await mvmRouterAbi.operations("0x8a9f2B6492A3E24B1D2b92ad29E80549Be6B21Cc"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
