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
    const registry = await Registry.deploy("0x2f741961cea2e88cfa2680eeaac040d41f41f3fedb01e38c06f4c6058fd7e425007d68aef83f9690b04f463e13eadd9b18f4869041f1b67e7f1a30c9d1d2c42c2a32fa1736807486256ad8dc6a8740dfb91917cf8d15848133819275be92b673257ad901f02f8a442ccf4f1b1d0d7d3a8e8fe791102706e575d36de1c2a4a40f", "0xb865aac159323dbe9366dcc61d81ad7f");
    await registry.deployed();

    const value = '0x01a19e2d55765cd2f2dc02d5c872ea9fbf76d59515c0e3ee6b000000000000000000000000b39180a9997b9c30fe61280a9d02ee123701fd910000000000000000000000002846c7ee79fff52afa1f9ab229d5c08b006d7ca50000000000000000000000000000000000000000000000000000000007478a68000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000262963c7e4261b9c17d210eac8b533b9c2667e2';
    const key: string = ethers.utils.keccak256(value);
    await registry.writeValue(key, value);

    const raw = "0xb865aac159323dbe9366dcc61d81ad7f0000000000000007965e5c6e434c3fa9b780c50f43cd955c00010100320003434e42000b43687569204e69752042695b87aece59dbed74806e12d1311ed01fb21203524ae5579ad02ab31a871f3bd216f733d634bfda280001e9e5b807fa8b455a8dfab189d28310ff0001004014889903c2112db14c8d9361993467bd7fefa45bdb08adc50451337b4fc06c8e24972e87630ed1a5bcb8c425b2c4cf46f4eff9451b6ef7dbea2b09c7dcd112ff";
    const mixinTx = await registry.mixin(raw);
    console.log("mixinTx", mixinTx.hash);
  });
});
