// yarn hardhat run --network quorum scripts/mixin.ts
import { ethers } from "hardhat";
const ABI = require('../artifacts/contracts/mixin/bridge.sol/Bridge.json');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);
  console.log("Deployer balance", await deployer.getBalance());

  const BLS = await ethers.getContractFactory("BLS");
  const bls = await BLS.attach("0xC164E080B874921F49199de49695dd511d2e5D52");
  // const bls = await BLS.deploy();
  // await bls.deployed();
  console.log("byteslib deployed to:", bls.address);

  const Registry = await ethers.getContractFactory("Registry", {
    libraries: {
      BLS: bls.address,
    },
  });
  // https://github.com/MixinNetwork/trusted-group/blob/master/mvm/quorum/contracts/mixin.sol#L27
  // ["2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425", "007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c", "2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673",  "257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f"]
  // const registry = await Registry.deploy("0x2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f", "0xf7f56b709bfc3a3d948f329699ad6f68");
  // await registry.deployed();
  const registry = Registry.attach("0x68a99087Bd6e08Ef73A2479C8206308DbD65c3B8");
  console.log("registry deployed to:", registry.address);

  // publish contract use bot: 7000103716
  // user_id: 03c19001-04dc-3d12-94aa-af68436e9139

  const Bridge = await ethers.getContractFactory("Bridge");
  // const bridge = await Bridge.deploy();
  // await bridge.deployed();
  let bridge = Bridge.attach("0xBb993F08B7982055D5C2e438832ef5505Eb35Ac9");

  // await bridge.bind("0xce9Ccf54865Fbae2dC2b1164Eb3E442e366A4ea2");
  const bridgeAbi = new ethers.Contract(bridge.address, ABI.abi, deployer);
  console.log("Bridged address:", await bridgeAbi.bridges(deployer.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
