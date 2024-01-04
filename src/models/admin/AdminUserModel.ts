import { AuditTimeModel } from "../common/auditTimeModel";
import { UserType } from "../../dto/auth/UserType";

export default interface AdminUserModel extends AuditTimeModel {
  email: string;
  name: string;
  password: string;
  phone:number;
  userType:UserType;

  setPassword(password: string): Promise<void>;
  validateUser(password: string): Promise<boolean>;
// eslint-disable-next-line semi
}
