import { AdminUserModel } from "../../models/admin/AdminUserModel";
import { AuthDto } from "../auth/AuthDto";
import { UserType } from "../auth/UserType";

export class AdminDto extends AuthDto {
  phoneNumber: string;
  email: string;
  name: string;
  profilePic: string;

  constructor(admin: AdminUserModel) {
    super(admin.id, UserType.ADMIN);
    this.phoneNumber = admin.phoneNumber;
    this.email = admin.email;
    this.name = admin.name;
    this.profilePic = admin.profilePic;
  }
}
