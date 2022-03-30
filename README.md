# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

## Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

Before deploy your contract, you need to set up your Etherscan API key and your node URL(.env has built-in Ropsten and Quorum node addresses).

**For you security of your private key, should set the environment variable before deployment.**

```shell
PRIVATE_KEY=your_private_key hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
PRIVATE_KEY=your_private_key npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

## Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

## Quorum

Quorum is the testnet for MVM, you can claim test coin from <https://faucet.mvmscan.com/>

Set PRIVATE_KEY environment variable with your private key, you can add `PRIVATE_KEY=your_private_key` to your command

## Mvm Contracts uniswap

If you want to deploy you owner contract, replace init code hash with your contract. The method `pairFor` under `contracts/periphery/libraries/UniswapV2Libary.sol`.

```solidity
 keccak256(abi.encodePacked(token0, token1)),
-   hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
+   hex'c772cebf50f21d1aaabec348a95d564223a90e345b20c705a86dbfc57b29ec46' // init code hash
```

`c772ce...9ec46` got from <https://testnet.mvmscan.com/address/0xd66c174a322eF2Ca6EabDFECaFbB2826Ccfd5cbf/logs>, '0xd66c174a322eF2Ca6EabDFECaFbB2826Ccfd5cbf' which is the address from `scripts/uniswap.ts`
