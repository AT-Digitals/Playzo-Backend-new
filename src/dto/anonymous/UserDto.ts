import { PropertyDto } from "./PropertyDto";
import { PropertyModel } from "../../models/property/PropertyModel";
import { UserModel } from "../../models/user/UserModel";
import { elemT } from "../../utils/UnionArray";
export class UserDto {
  email: string;
  phoneNumber: string;
  alternativeNumber: string;
  name: string;
  isVerified: boolean;
  otp: string;
  id: string;
  favouriteProperties: PropertyDto[];

  constructor(user: UserModel) {
    this.id = user.id;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.alternativeNumber = user.alternativeNumber;
    this.isVerified = user.isVerified;
    this.otp = user.otp;
    this.name = user.name;
    this.favouriteProperties = elemT(user.favouriteProperties).map(
      (property: PropertyModel) => new PropertyDto(property)
    );
  }
}
