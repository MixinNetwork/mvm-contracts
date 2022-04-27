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
  const pair = new ethers.Contract("0x704cCd25904468265D1aD6aAf1FfFb86D6Afc542", UniswapPairABI.abi, deployer);
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
  const mvmRouter = await UniswapMVMRouter.attach("0x93634C04c4e76f680B0e7fe75645579d72ba11A6");
  console.log("UniswapMVMRouter address: " + mvmRouter.address);
  const mvmRouterAbi = new ethers.Contract(mvmRouter.address, UniswapMVMRouterABI.abi, deployer);
  console.log("UniswapMVMRouter cnb nxc pair: ", await mvmRouterAbi.fetchPair("0x155bDfAb24f07630C27a3F31634B33F94eC4A634", "0xCc4623795F07CaFf65069704D5008778921456a5"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
