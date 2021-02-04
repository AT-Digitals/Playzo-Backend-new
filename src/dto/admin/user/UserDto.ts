import { UserModel } from "../../../models/user/UserModel";

export class UserDto {
  phoneNumber: string;
  email: string;
  name: string;

  constructor(user: UserModel) {
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.name = user.name;
  }
}
