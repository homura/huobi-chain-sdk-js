import { createServiceBindingClass, read, write } from '@mutadev/service';
import { Address, SignedTransaction, Vec } from '@mutadev/types';

interface NewAdmin {
  new_admin: Address;
}

interface AddressList {
  addrs: Vec<Address>;
}

interface StatusList {
  status: Vec<boolean>;
}

export const AdmissionControlService = createServiceBindingClass({
  serviceName: 'admission_control',
  read: {
    is_permitted: read<SignedTransaction, null>(),
    is_valid: read<SignedTransaction, null>(),
    status: read<AddressList, StatusList>(),
  },
  write: {
    change_admin: write<NewAdmin, null>(),
    forbid: write<AddressList, null>(),
    permit: write<AddressList, null>(),
  },
});
