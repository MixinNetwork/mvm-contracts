// yarn test test/mixin.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Mixin", function () {
  it("Tests for mixin registry", async () => {
    const [deployer] = await ethers.getSigners();

    const BLS = await ethers.getContractFactory("BLS")
    const bls = await BLS.deploy();
    await bls.deployed();

    const Registry = await ethers.getContractFactory("Registry", {
      libraries: {
        BLS: bls.address,
      },
    });
    const registry = await Registry.deploy("0x2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f", "0x2f930b66be1e3a699b1a03ba727e05d3");
    await registry.deployed();

    const raw = "0x2f930b66be1e3a699b1a03ba727e05d30000000000000000965e5c6e434c3fa9b780c50f43cd955c0002092e004a0003434e42000b43687569204e6975204269bb993f08b7982055d5c2e438832ef5505eb35ac981bac14f000000000000000000000000240c9935f48a6ac52e6b286915cde36d1e14b4a416df4cc5a7970b080001e9e5b807fa8b455a8dfab189d28310ff000100401803af9daf4a2625907835714490cf370967fd9305d657ab6e5c236e5056491c2418a314f07ec9f786e0af9b2b8318db92c74c152ccbc7de0f0564c634fc30be";
    const mixinTx = await registry.mixin(raw);
    console.log("mixinTx", mixinTx.hash);
  });
});
