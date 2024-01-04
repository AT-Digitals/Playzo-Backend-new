import { AuditTimeModel } from "../common/auditTimeModel";

export default interface AdminUserModel extends AuditTimeModel {
  email: string;
  name: string;
  password: string;
  // phone:

  setPassword(password: string): Promise<void>;
  validateUser(password: string): Promise<boolean>;
// eslint-disable-next-line semi
}
