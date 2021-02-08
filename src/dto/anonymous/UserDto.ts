import { UserModel } from "../../models/user/UserModel";

export class UserDto {
  email: string;
  phoneNumber: string;
  name: string;
  isVerified: boolean;
  otp: string;
  id: string;

  constructor(user: UserModel) {
    this.id = user.id;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.isVerified = user.isVerified;
    this.otp = user.otp;
    this.name = user.name;
  }
}
