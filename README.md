# huobi-chain-sdk

Huobi Chain JavaScript SDK. The SDK is a binding for [Huobi Chain Services](https://github.com/HuobiGroup/huobi-chain/tree/master/services)  
base on [muta-sdk](https://github.com/nervosnetwork/muta-sdk-js). It is recommended to code with an IDE that supports TypeScript such as VSCode or WebStorm, 
there will be corresponding code completion

## Example

```typescript
import { Muta, AssetService, BigNumber, utils } from 'huobi-chain-sdk';

const muta = new Muta();

const client = muta.client();
const account = Muta.accountFromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2'
);

async function main() {
  const service = new AssetService(client, account);

  const supply = new BigNumber('9223372036854775808'); // 1 << 63

  const receipt = await service.create_asset({
    name: Math.random().toString(),
    precision: 0,
    supply,
    symbol: Math.random().toString()
  });

  const createdAsset = receipt.response.ret;

  console.log(utils.toHex(createdAsset.issuer), utils.toHex(account.address));
  const assetId = createdAsset.id;

  const {
    ret: { balance }
  } = await service.get_balance({
    asset_id: assetId,
    user: createdAsset.issuer
  });
  console.log(supply === balance);

  const to = '0x2000000000000000000000000000000000000000';

  await service.transfer({
    asset_id: assetId,
    to,
    value: 500
  });

  const {
    ret: { balance: balance2 }
  } = await service.get_balance({
    asset_id: assetId,
    user: to
  });
  console.log(balance2, 500);
}

main();
```

## Services

### AssetService

```typescript

interface AssetServiceModel {
  create_asset: Write<CreateAssetPayload, Asset>;
  get_allowance: Read<GetAllowancePayload, GetAllowanceResponse>;
  get_asset: Read<GetAssetPayload, Asset>;
  get_native_asset: Read<undefined, Asset>;
  get_balance: Read<GetBalancePayParam, GetBalanceResponse>;
  transfer: Write<TransferPayParam, ''>;
  approve: Write<ApprovePayload, ''>;
  transfer_from: Write<TransferFromPayload, ''>;
}
```

### NodeManagerService

```typescript
interface NodeManagerServiceModel {
  get_admin: Read<undefined, Address>;
  set_admin: Write<SetAdminPayload>;
  update_metadata: Write<UpdateMetadataPayload>;
  update_validators: Write<UpdateValidatorsPayload>;
  update_interval: Write<UpdateIntervalPayload>;
  update_ratio: Write<UpdateRatioPayload>;
}
```

### RISCVService

```typescript
interface RISCVServiceModel {
  call: Read<ExecPayload, string>;
  exec: Write<ExecPayload, string>;
  grant_deploy_auth: Write<Addresses>;
  revoke_deploy_auth: Write<Addresses>;
  check_deploy_auth: Read<Addresses, Addresses>;
  deploy: Write<DeployPayload, DeployResp>;
  get_contract: Read<GetContractPayload, GetContractResp>;
}
```
