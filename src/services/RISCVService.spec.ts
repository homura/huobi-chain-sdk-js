import test from 'ava';
import { Muta } from 'muta-sdk';
import { RISCVService } from './RISCVService';

const muta = new Muta();

const client = muta.client();
const account = Muta.accountFromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2'
);

test('test RISCVService', async t => {
  const service = new RISCVService(client, account);
  const res = await service.check_deploy_auth({
    addresses: ['0x0000000000000000000000000000000000000000']
  });

  t.is(res.isError, false);
  t.deepEqual(res.ret, { addresses: [] });
});
