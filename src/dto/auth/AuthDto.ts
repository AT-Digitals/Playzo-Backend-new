import { UserType } from "./UserType";

export default class AuthDto {
  constructor(public id: string, public userType: UserType) {}

  public static from(user: any) {
    return new AuthDto(user["id"], user["userType"]);
  }

  public getTokenObject() {
    return {
      id: this.id,
      userType: this.userType,
      loginTime: new Date(),
    };
  }

  public isAdmin() {
    return this.userType.includes(UserType.ADMIN);
  }
}
