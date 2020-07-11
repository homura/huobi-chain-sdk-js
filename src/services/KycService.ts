import { createServiceBindingClass, read, write } from '@mutadev/service';
import { Address, Vec } from '@mutadev/types';

interface KycOrgInfo {
  name: string;
  description: string;
  admin: Address;
  supported_tags: Vec<string>;
  approved: boolean;
}

interface EvalUserTagExpression {
  user: Address;
  expression: string;
}

interface ChangeOrgAdmin {
  name: string;
  new_admin: Address;
}

interface RegisterNewOrg {
  name: string;
  description: string;
  admin: Address;
  supported_tags: Vec<string>;
}

interface ChangeOrgApproved {
  org_name: string;
  approved: boolean;
}

interface UpdateOrgSupportTags {
  org_name: string;
  supported_tags: Vec<string>;
}

interface GetUserTags {
  org_name: string;
  user: Address;
}

interface UpdateUserTags {
  org_name: string;
  user: Address;
  tags: Record<string, Vec<string>>;
}

export const KycService = createServiceBindingClass({
  serviceName: 'kyc',
  read: {
    get_orgs: read<null, Vec<string>>(),
    get_org_info: read<string, KycOrgInfo | null>(),
    get_org_supported_tags: read<string, Vec<string>>(),
    get_user_tags: read<GetUserTags, Record<string, Vec<string>>>(),
    eval_user_tag_expression: read<EvalUserTagExpression, boolean>(),
  },
  write: {
    change_org_approved: write<ChangeOrgApproved, null>(),
    change_service_admin: write<ChangeOrgAdmin, null>(),
    register_org: write<RegisterNewOrg, null>(),
    update_supported_tags: write<UpdateOrgSupportTags, null>(),
    update_user_tags: write<UpdateUserTags, null>(),
  },
});
