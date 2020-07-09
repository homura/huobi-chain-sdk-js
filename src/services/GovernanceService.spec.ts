import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { BigNumber } from '@mutadev/shared';
import { GovernanceService } from './GovernanceService';

const account = Account.fromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2',
);

const client = new Client();

test('test GovernanceService', async () => {
  const service = new GovernanceService(client, account);
  const res = await service.read.get_admin_address();

  expect(Number(res.code)).toBe(0);
});
