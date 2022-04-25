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
  // registry PID: f6281e1c-53f7-3125-9cdd-30d5389189f8
  // const registry = await Registry.deploy("0x2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f", "0xf6281e1c53f731259cdd30d5389189f8");
  // await registry.deployed();
  const registry = Registry.attach("0x535E4e8b6013f344ece46e7b0932AB617B327C39");
  // publish registry through bot: 7000103716, command:
  // publish f6281e1c-53f7-3125-9cdd-30d5389189f8:0x535E4e8b6013f344ece46e7b0932AB617B327C39:META
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
  // ROAY 69b2d237-1eb2-3b6c-8e1d-3876e507b263
  console.log("registry ROAY address", await registryAbi.contracts("0x69b2d2371eb23b6c8e1d3876e507b263"));
  console.log("registry INBOUND", await registryAbi.INBOUND());

  const Bridge = await ethers.getContractFactory("Bridge");
  // const bridge = await Bridge.deploy();
  // await bridge.deployed();
  let bridge = Bridge.attach("0xBb993F08B7982055D5C2e438832ef5505Eb35Ac9");

  // await bridge.bind("0xce9Ccf54865Fbae2dC2b1164Eb3E442e366A4ea2");
  const bridgeAbi = new ethers.Contract(bridge.address, BridgeABI.abi, deployer);
  console.log("Bridged address:", await bridgeAbi.bridges("0x0215fD72e01e806AeD843F3a0161A0c003969421"));

  const SimpleRefund = await ethers.getContractFactory("SimpleRefund");
  // const refund = await SimpleRefund.deploy();
  // await refund.deployed();
  let refund = SimpleRefund.attach("0x07B0bF340765CAE77b734D82EB8d35229796CeBc");
  console.log("Refund address:", refund.address);
  // ROAY invoke f6281e1c-53f7-3125-9cdd-30d5389189f8:69b2d237-1eb2-3b6c-8e1d-3876e507b263:0.114:07b0bf340765cae77b734d82eb8d35229796cebc322e9f04
  // CNB  invoke f6281e1c-53f7-3125-9cdd-30d5389189f8:965e5c6e-434c-3fa9-b780-c50f43cd955c:0.114:07b0bf340765cae77b734d82eb8d35229796cebc322e9f04
  // NXC  invoke f6281e1c-53f7-3125-9cdd-30d5389189f8:66152c0b-3355-38ef-9ec5-cae97e29472a:0.114:07b0bf340765cae77b734d82eb8d35229796cebc322e9f04
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
