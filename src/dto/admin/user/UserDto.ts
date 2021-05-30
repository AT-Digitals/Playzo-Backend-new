import { AdminPropertyOverviewDto } from "../property/AdminPropertyOverviewDto";
import { UserModel } from "../../../models/user/UserModel";
import { elemT } from "../../../utils/UnionArray";

export class UserDto {
  phoneNumber: string;
  email: string;
  name: string;
  id: string;
  favouriteProperties: AdminPropertyOverviewDto[] = [];
  lastLoginTime: Date;
  lastloginTimeString: string;
  accountCreationTime: Date;
  accountCreationTimeString: string;
  deviceInfo: string;

  constructor(user: UserModel) {
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.name = user.name;
    this.id = user.id;
    this.favouriteProperties = elemT(user.favouriteProperties).map(
      (property) => new AdminPropertyOverviewDto(property)
    );
    this.lastLoginTime = user.lastLoginTimeStamp;
    this.lastloginTimeString = user.lastLoginTimeStamp
      ? user.lastLoginTimeStamp.toLocaleDateString()
      : new Date().toLocaleDateString();
    this.accountCreationTime = user.accountCreationTimeStamp;
    this.accountCreationTimeString = user.accountCreationTimeStamp
      ? user.accountCreationTimeStamp.toLocaleDateString()
      : new Date().toLocaleDateString();
    if (user.userDeviceInfo) {
      this.deviceInfo = `${user.userDeviceInfo.os} ${user.userDeviceInfo.browser}`;
    }
  }
}
