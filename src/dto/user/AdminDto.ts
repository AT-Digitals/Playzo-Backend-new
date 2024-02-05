import { AccessType } from "../auth/AccessType";
import AdminUserModel from "../../models/admin/AdminUserModel";
import AuthDto from "../auth/AuthDto";
import { UserType } from "../auth/UserType";

export class AdminDto extends AuthDto {
  email: string;
  name: string;
  token?:string;
  phone: number;
  accessType?:AccessType;

  constructor(admin: AdminUserModel) {
    super(admin.id, UserType.ADMIN);
    this.email = admin.email;
    this.name = admin.name;
    this.phone = admin.phone;
    this.userType = UserType.ADMIN;
    this.accessType = admin.accessType;
  }
}
