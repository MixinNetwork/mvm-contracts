// yarn hardhat run --network quorum scripts/mixin.ts
import { ethers } from "hardhat";
const BridgeABI = require('../artifacts/contracts/mixin/bridge.sol/Bridge.json');
const RegistryABI = require('../artifacts/contracts/mixin/registry.sol/Registry.json');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);
  console.log("Deployer balance", await deployer.getBalance());

  const BLS = await ethers.getContractFactory("BLS");
  const bls = await BLS.attach("0xC164E080B874921F49199de49695dd511d2e5D52");
  // const bls = await BLS.deploy();
  // await bls.deployed();
  console.log("bls deployed to:", bls.address);

  const Registry = await ethers.getContractFactory("Registry", {
    libraries: {
      BLS: bls.address,
    },
  });
  // https://github.com/MixinNetwork/trusted-group/blob/master/mvm/quorum/contracts/mixin.sol#L27
  // ["2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425", "007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c", "2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673",  "257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f"]
  // registry PID: 041781e6-eb19-3c4a-bcd4-f4a23112d112
  // const registry = await Registry.deploy("0x2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f", "0x041781e6eb193c4abcd4f4a23112d112");
  // await registry.deployed();
  const registry = Registry.attach("0x2139b46ab7F3FF61EdEE83C11AEE749d7e653398");
  // publish registry through bot: 7000103716, command:
  // publish 041781e6-eb19-3c4a-bcd4-f4a23112d112:0x2139b46ab7F3FF61EdEE83C11AEE749d7e653398:META
  console.log("registry deployed to:", registry.address);
  const registryAbi = new ethers.Contract(registry.address, RegistryABI.abi, deployer);
  // Fetch user id by evm address
  console.log("registry user", await registryAbi.users("0xAD75BBbB274fF77Aeb284f4Ed26250Ac6eE99B30"));
  // Fetch users' evm address by users' mixin id
  const userId = 'e9e5b807-fa8b-455a-8dfa-b189d28310ff';
  const identity = `0x0001${userId}0001`;
  const hash = ethers.utils.keccak256(identity.replace(/-/gi, ''));
  console.log("registry li address", await registryAbi.contracts(hash))
  // Fetch assets' evm address by assets' mixin id
  // CNB 965e5c6e-434c-3fa9-b780-c50f43cd955c
  console.log("registry cnb address", await registryAbi.contracts("0x965e5c6e434c3fa9b780c50f43cd955c"));
  // NXC 66152c0b-3355-38ef-9ec5-cae97e29472a
  console.log("registry nxc address", await registryAbi.contracts("0x66152c0b335538ef9ec5cae97e29472a"));
  console.log("registry INBOUND", await registryAbi.INBOUND());

  const Bridge = await ethers.getContractFactory("Bridge");
  // const bridge = await Bridge.deploy();
  // await bridge.deployed();
  let bridge = Bridge.attach("0xBb993F08B7982055D5C2e438832ef5505Eb35Ac9");

  // await bridge.bind("0xce9Ccf54865Fbae2dC2b1164Eb3E442e366A4ea2");
  const bridgeAbi = new ethers.Contract(bridge.address, BridgeABI.abi, deployer);
  console.log("Bridged address:", await bridgeAbi.bridges(deployer.address));
  console.log("Bridged address:", await bridgeAbi.bridges("0x0215fD72e01e806AeD843F3a0161A0c003969421"));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
