import { createServiceBindingClass, read, write } from '@mutadev/service'
import { Address, Hash, Hex, u64 } from '@mutadev/types';

interface GetBalancePayload {
  asset_id: Hash;
  user: Address;
}

interface GetBalanceResponse {
  asset_id: string;
  balance: u64;
}

interface TransferPayload {
  asset_id: Hash;
  to: Address;
  value: u64;
}

interface CreateAssetPayload {
  name: string;
  symbol: string;
  supply: u64;
  precision: u64;
}

interface Asset {
  id: Hash;
  name: string;
  symbol: string;
  supply: u64;
  precision: u64;
  issuer: Address;
}

interface GetAssetPayload {
  id: Hash;
}

type ApprovePayload = TransferPayload;

interface TransferFromPayload {
  asset_id: Hash;
  sender: Address;
  recipient: Address;
  value: u64;
}

interface GetAllowancePayload {
  asset_id: Hash;
  grantor: Address;
  grantee: Address;
}

interface GetAllowanceResponse {
  asset_id: Hash;
  grantor: Address;
  grantee: Address;
  value: u64;
}

interface NewAdmin {
  addr: Address;
}

interface MintAsset {
  asset_id: Hash,
  to: Address,
  amount: u64,
  proof: Hex,
  memo: string,
}

interface BurnAsset {
  asset_id: Hash,
  amount: u64,
  proof: Hex,
  memo: string,
}

export const AssetService = createServiceBindingClass({
    serviceName: 'asset',
    read: {
        get_asset: read<GetAssetPayload, Asset>(),
        get_native_asset: read<null, Asset>(),
        get_allowance: read<GetAllowancePayload, GetAllowanceResponse>(),
        get_balance: read<GetBalancePayload, GetBalanceResponse>(),
    },
    write: {
        create_asset: write<CreateAssetPayload, Asset>(),
        transfer: write<TransferPayload, null>(),
        approve: write<ApprovePayload, null>(),
        transfer_from: write<TransferFromPayload, null>(),
        change_admin: write<NewAdmin, null>(),
        mint: write<MintAsset, null>(),
        burn: write<BurnAsset, null>(),
    },
});
