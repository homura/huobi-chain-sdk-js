import { readFileSync } from 'fs';
import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { InterpreterType, RISCVService } from './RISCVService';
import { AssetService } from './AssetService';

const account = Account.fromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2',
);

const nativeAssetId = "0xf56924db538e77bb5951eb5ff0d02b88983c49c45eea30e8ae3e7234b311436c";

const client = new Client({
  defaultCyclesLimit: '0xffffffff',
});

const riscvService = new RISCVService(client, account);
const assetService = new AssetService(client, account);

async function deploy(code: string, initArgs: string) {
  const res0 = await riscvService.write.deploy({
    code,
    intp_type: InterpreterType.Binary,
    init_args: initArgs,
  });
  console.log(res0);
}

async function check_deploy_auth(address: string) {
  const res0 = await riscvService.read.check_deploy_auth({
    addresses: [ address ],
  });
  console.log(res0);
}

async function grant_deploy_auth(address: string) {
  const res0 = await riscvService.write.grant_deploy_auth({
    addresses: [ address ],
  });
  console.log(res0);
}

async function get_balance(assetId: string, user: string) {
  const res0 = await assetService.read.get_balance({
    asset_id: assetId,
    user,
  });
  return Number(res0.succeedData.balance);
}

async function get_native_balance(user: string) {
  return await get_balance(nativeAssetId, user);
}

test('test RISCVService', async () => {
    await check_deploy_auth(account.address);
    await grant_deploy_auth(account.address);
    await check_deploy_auth(account.address);
    const balance = await get_native_balance(account.address);
    const code = readFileSync('../../rust/huobi-chain/services/riscv/src/tests/simple_storage');
    await deploy(code.toString('hex'), 'set k init');
});
