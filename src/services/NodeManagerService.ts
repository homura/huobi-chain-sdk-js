import {
  createBindingClass,
  Read,
  read,
  Write,
  write
} from 'muta-sdk/build/main/service';
import {
  Address,
  Bytes,
  u32,
  u64,
  Vec
} from 'muta-sdk/build/main/types/scalar';

interface ValidatorExtend {
  bls_pub_key: Bytes;
  address: Address;
  propose_weight: u32;
  vote_weight: u32;
}

interface SetAdminPayload {
  admin: Address;
}

interface UpdateMetadataPayload {
  verifier_list: Vec<ValidatorExtend>;
  interval: u64;
  propose_ratio: u64;
  prevote_ratio: u64;
  precommit_ratio: u64;
  brake_ratio: u64;
}

interface UpdateValidatorsPayload {
  verifier_list: Vec<ValidatorExtend>;
}

interface UpdateIntervalPayload {
  interval: u64;
}

interface UpdateRatioPayload {
  propose_ratio: u64;
  prevote_ratio: u64;
  precommit_ratio: u64;
  brake_ratio: u64;
}

export interface NodeManagerServiceModel {
  get_admin: Read<undefined, Address>;
  set_admin: Write<SetAdminPayload>;
  update_metadata: Write<UpdateMetadataPayload>;
  update_validators: Write<UpdateValidatorsPayload>;
  update_interval: Write<UpdateIntervalPayload>;
  update_ratio: Write<UpdateRatioPayload>;
}

/**
 * @class
 */
export const NodeManagerService = createBindingClass<NodeManagerServiceModel>(
  'node_manager',
  {
    get_admin: read(),
    set_admin: write(),
    update_metadata: write(),
    update_validators: write(),
    update_interval: write(),
    update_ratio: write()
  }
);
