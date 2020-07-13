import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { BigNumber } from '@mutadev/shared';
import { AssetService } from './AssetService';

const account = Account.fromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2',
);

const client = new Client();

test('test AssetService', async () => {
  const service = new AssetService(client, account);

  const supply = 10000;
  const precision = 18;
  const res = await service.write.create_asset({
    name: Math.random().toString(),
    supply,
    precision,
    symbol: Math.random().toString(),
    relayable: false,
  });

  const asset = res.response.response.succeedData;

  expect(Number(res.response.response.code)).toBe(0);
  expect(new BigNumber(asset.supply).eq(new BigNumber(supply))).toBe(true);

  await service.write.transfer({
    asset_id: asset.id,
    to: '0x0000000000000000000000000000000000000000',
    value: 123,
    memo: '',
  });

  const balanceRes = await service.read.get_balance({
    asset_id: asset.id,
    user: account.address,
  });

  expect(balanceRes.succeedData.balance).toBe(supply - 123);
});
