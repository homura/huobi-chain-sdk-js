import test from 'ava';
import { Muta, utils } from 'muta-sdk';
import { NodeManagerService } from './NodeManagerService';

const muta = new Muta();

const client = muta.client();
const account = Muta.accountFromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2',
);

test('test NodeManagerService', async t => {
  const service = new NodeManagerService(client, account);
  const res = await service.get_admin();

  t.is(utils.toHex(res.succeedData).startsWith('0x'), true);
});
