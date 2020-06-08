import { createBindingClass, read, Read, write, Write } from '@mutajs/service';
import { Address, Hash, Vec } from '@mutajs/types';

enum InterpreterType {
  Binary = 1,
  Duktape = 2,
}

interface DeployPayload {
  code: string;
  intp_type: InterpreterType;
  init_args: string;
}

interface DeployResp {
  address: Address;
  init_ret: string;
}

interface ExecPayload {
  address: Address;
  args: string;
}

interface GetContractPayload {
  address: Address;
  get_code: boolean;
  storage_keys: Vec<string>;
}

interface Addresses {
  addresses: Vec<Address>;
}

interface GetContractResp {
  code_hash: Hash;
  intp_type: InterpreterType;
  code: string;
  storage_values: Vec<string>;
}

interface RISCVServiceModel {
  call: Read<ExecPayload, string>;
  exec: Write<ExecPayload, string>;
  grant_deploy_auth: Write<Addresses>;
  revoke_deploy_auth: Write<Addresses>;
  check_deploy_auth: Read<Addresses, Addresses>;
  deploy: Write<DeployPayload, DeployResp>;
  get_contract: Read<GetContractPayload, GetContractResp>;
}

export const RISCVService = createBindingClass<RISCVServiceModel>('riscv', {
  call: read(),
  exec: write(),
  grant_deploy_auth: write(),
  revoke_deploy_auth: write(),
  check_deploy_auth: read(),
  deploy: write(),
  get_contract: read(),
});
