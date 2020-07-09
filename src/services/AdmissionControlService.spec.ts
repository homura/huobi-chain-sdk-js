import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { BigNumber } from '@mutadev/shared';
import { AdmissionControlService } from './AdmissionControlService';

const account = Account.fromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2',
);

const client = new Client();

test('test AdmissionControlService', async () => {
  const service = new AdmissionControlService(client, account);
  const res = await service.write.permit({
    addrs: ['0x0000000000000000000000000000000000000000'],
  });

  expect(Number(res.response.response.code)).toBe(0);
});
