import { createServiceBindingClass, read, write } from '@mutadev/service';
import { Address, Hash, Vec } from '@mutadev/types';

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

interface AddressList {
  addresses: Vec<Address>;
}

interface GetContractResp {
  code_hash: Hash;
  intp_type: InterpreterType;
  code: string;
  storage_values: Vec<string>;
  authorizer?: Address;
}

export const RISCVService = createServiceBindingClass({
  serviceName: 'riscv',
  read: {
    call: read<ExecPayload, string>(),
    check_deploy_auth: read<AddressList, AddressList>(),
    get_contract: read<GetContractPayload, GetContractResp>(),
  },
  write: {
    exec: write<ExecPayload, string>(),
    grant_deploy_auth: write<AddressList, null>(),
    revoke_deploy_auth: write<AddressList, null>(),
    deploy: write<DeployPayload, DeployResp>(),
    approve_contracts: write<AddressList, null>(),
    revoke_contracts: write<AddressList, null>(),
  },
});
