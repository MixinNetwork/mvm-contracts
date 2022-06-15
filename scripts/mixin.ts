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

  const Storage = await ethers.getContractFactory("EternalStorage");
  // const storage = await Storage.deploy();
  // await storage.deployed();
  const storage = await Storage.attach("0x510a9f1AAbE048912F6536A833ecB6039061e872");
  console.log("storage deployed to:", storage.address);

  const Registry = await ethers.getContractFactory("Registry", {
    libraries: {
      BLS: bls.address,
    },
  });
  // https://github.com/MixinNetwork/trusted-group/blob/master/mvm/quorum/contracts/mixin.sol#L27
  // ["2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425", "007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c", "2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673",  "257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f"]
  // registry PID: 119f84c9-9f72-31b5-af71-611de05dace8
  // const registry = await Registry.deploy("0x2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f", "0x119f84c99f7231b5af71611de05dace8");
  // await registry.deployed();
  const registry = Registry.attach("0xbb0860774b68b4Aaa07ED32fb118dA39e5b18454");
  // publish registry through bot: 7000103716, command:
  // publish 119f84c9-9f72-31b5-af71-611de05dace8:0xbb0860774b68b4Aaa07ED32fb118dA39e5b18454:META
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

  let key = "0x4e7f836e7deab9dd6160277fac3c501fbaf5269e84bf032a3c91137ba8a73d9b";
  const value = "0x000bbe54e2b11d6671238edb6fb3ed83f73a1ca3df38ed17390000000000000000000000000000000000000000000000000000000005f5e1000000000000000000000000000000000000000000000000000d090add2aceb4b800000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000bf7c691c00de8e3d647d5258ebaec87857a1838d0000000000000000000000000000000000000000000000000000000062a201b90000000000000000000000000000000000000000000000000000000000000002000000000000000000000000155bdfab24f07630c27a3f31634b33f94ec4a634000000000000000000000000cc4623795f07caff65069704d5008778921456a5";
  await registry.writeValue(storage.address, key, value);
  console.log("getBytesValue:", await storage.getBytesValue(key));
  key = ethers.utils.keccak256("0x12345678");
  await registry.writeValue(storage.address, key, "0x12345678");
  console.log("getBytesValue:", await storage.getBytesValue(key));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
