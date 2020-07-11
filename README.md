# huobi-chain-sdk

Huobi Chain JavaScript SDK. The SDK is a binding for [Huobi Chain Services](https://github.com/HuobiGroup/huobi-chain/tree/master/services)  
base on [muta-sdk](https://github.com/nervosnetwork/muta-sdk-js). It is recommended to code with an IDE that supports TypeScript such as VSCode or WebStorm,
there will be corresponding code completion.

## Install

```
npm install @mutadev/muta-sdk @mutadev/service graphql@14.6 huobi-chain-sdk
```

## Example

```js
const { Account, Client } = require("@mutadev/muta-sdk");
const { AssetService } = require("huobi-chain-sdk");
const BigNumber = require('bignumber.js');

const supply = 10000;
const precision = 18;
const service = new AssetService(
  new Client(),
  new Account("0x_my_private_key")
);

async function main() {
  const res = await service.write.create_asset({
    name: Math.random().toString(),
    supply,
    precision,
    symbol: Math.random().toString()
  });

  const asset = res.response.response.succeedData;

  expect(Number(res.response.response.code)).toBe(0);
  expect(new BigNumber(asset.supply).eq(new BigNumber(supply))).toBe(true);

  await service.write.transfer({
    asset_id: asset.id,
    to: "0x0000000000000000000000000000000000000000",
    value: 123
  });

  const balanceRes = await service.read.get_balance({
    asset_id: asset.id,
    user: account.address
  });

  console.log(balanceRes);

}
```
