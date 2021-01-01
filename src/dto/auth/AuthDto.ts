import { UserType } from "./UserType";

export class AuthDto {
  constructor(public id: string, public userType: UserType) {}

  public getTokenObject() {
    return {
      id: this.id,
      userType: this.userType,
    };
  }
}
