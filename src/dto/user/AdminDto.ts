import { AdminUserModel } from "../../models/admin/AdminUserModel";
import { AuthDto } from "../auth/AuthDto";
import { UserType } from "../auth/UserType";

export class AdminDto extends AuthDto {
  email: string;
  name: string;

  constructor(admin: AdminUserModel) {
    super(admin.id, UserType.ADMIN);
    this.email = admin.email;
    this.name = admin.name;
  }
}
