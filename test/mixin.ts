// yarn test test/mixin.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Mixin", function () {
  it("Tests for uniswap v2 factory", async () => {
    const [deployer] = await ethers.getSigners();

    const BLS = await ethers.getContractFactory("BytesLib")
    const bls = await BLS.deploy();
    await bls.deployed();

    const Registry = await ethers.getContractFactory("Registry", {
      libraries: {
        BLS: bls.address,
      },
    });
    const registry = await Registry.deploy("0x2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f", "0x03c1900104dc3d1294aaaf68436e9139");
    await registry.deployed();

    const raw = "0x03c1900104dc3d1294aaaf68436e91390000000000000000965e5c6e434c3fa9b780c50f43cd955c0002091a004a0003434e42000b43687569204e6975204269bb993f08b7982055d5c2e438832ef5505eb35ac981bac14f000000000000000000000000240c9935f48a6ac52e6b286915cde36d1e14b4a416df454763c6d3200001e9e5b807fa8b455a8dfab189d28310ff0001004004040d6cad832ac73e15ab33534a758313725ee2e76391405b56dcf562e4686a224c9713ed265fea3af0a9493faa195140b9ccb75459cd0e8a8681eda7644a5a";
    const mixinTx = await registry.mixin(raw);
    console.log("mixinTx", mixinTx);
  });
});
