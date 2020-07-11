import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { KycService } from './KycService';

const account = Account.fromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2',
);

const client = new Client();

test('test KycService', async () => {
  const service = new KycService(client, account);
  const res1 = await service.read.get_orgs();
  expect(Number(res1.code)).toBe(0);

  const res2 = await service.read.get_org_info('huobi');
  expect(Number(res2.code)).toBe(0);

  const res3 = await service.read.get_org_supported_tags('huobi');
  expect(Number(res3.code)).toBe(0);

  const res4 = await service.write.update_user_tags({
    org_name: 'huobi',
    user: '0xcff1002107105460941f797828f468667aa1a2db',
    tags: {
      'name': ['Alice'],
      'age': ['10'],
    },
  });
  expect(Number(res4.response.response.code)).toBe(0);

  const res5 = await service.read.get_user_tags({
    org_name: 'huobi',
    user: '0xcff1002107105460941f797828f468667aa1a2db',
  });
  expect(Number(res3.code)).toBe(0);

  const res6 = await service.read.get_org_info('muta');
  expect(Number(res6.code)).toBe(0x67);
});
