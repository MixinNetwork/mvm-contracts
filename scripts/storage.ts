// yarn hardhat run --network testnet scripts/storage.ts
import { ethers } from "hardhat";
const StorageABI = require('../artifacts/contracts/mixin/Storage.sol/Storage.json');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);
  console.log("Deployer balance", await deployer.getBalance());

  const Storage = await ethers.getContractFactory("Storage");
  // for testnet
  // const storage = await Storage.attach("0xB255372aDf554BadD02F02D0684FF4211161f25e");
  const storage = await Storage.deploy();
  await storage.deployed();
  console.log("storage deployed to:", storage.address);

  const storageAbi = new ethers.Contract(storage.address, StorageABI.abi, deployer);
  const value = "0x012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789";
  const key = ethers.utils.keccak256(value);
  await storageAbi.write(key, value);
  const resp = await storageAbi.read(key);
  console.log(key);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
