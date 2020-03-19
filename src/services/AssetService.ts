import {
  Write,
  Read,
  createBindingClass,
  write,
  read
} from 'muta-sdk/build/main/service';
import { Address, Hash, u64 } from 'muta-sdk/build/main/types/scalar';

export interface GetBalancePayParam {
  asset_id: Hash;
  user: Address;
}

export interface GetBalanceResponse {
  asset_id: string;
  balance: u64;
}

export interface TransferPayParam {
  asset_id: Hash;
  to: Address;
  value: u64;
}

export interface CreateAssetPayload {
  name: string;
  symbol: string;
  supply: u64;
  precision: u64;
}

export interface Asset {
  id: Hash;
  name: string;
  symbol: string;
  supply: u64;
  issuer: Address;
  precision: u64;
}

export interface GetAssetPayload {
  id: Hash;
}

export interface ApprovePayload {
  asset_id: Hash;
  to: Address;
  value: u64;
}

export interface TransferFromPayload {
  asset_id: Hash;
  sender: Address;
  recipient: Address;
  value: u64;
}

export interface GetAllowancePayload {
  asset_id: Hash;
  grantor: Address;
  grantee: Address;
}

export interface GetAllowanceResponse {
  asset_id: Hash;
  grantor: Address;
  grantee: Address;
  value: u64;
}

export interface AssetServiceModel {
  create_asset: Write<CreateAssetPayload, Asset>;
  get_allowance: Read<GetAllowancePayload, GetAllowanceResponse>;
  get_asset: Read<GetAssetPayload, Asset>;
  get_native_asset: Read<undefined, Asset>;
  get_balance: Read<GetBalancePayParam, GetBalanceResponse>;
  transfer: Write<TransferPayParam, ''>;
  approve: Write<ApprovePayload, ''>;
  transfer_from: Write<TransferFromPayload, ''>;
}

export const AssetService = createBindingClass<AssetServiceModel>('asset', {
  approve: write(),
  create_asset: write(),
  get_allowance: read(),
  get_asset: read(),
  get_balance: read(),
  get_native_asset: read(),
  transfer: write(),
  transfer_from: write()
});
