import { AuthDto } from "../auth/AuthDto";
import { PropertyDto } from "./PropertyDto";
import { PropertyModel } from "../../models/property/PropertyModel";
import { UserModel } from "../../models/user/UserModel";
import { UserType } from "../auth/UserType";
import { elemT } from "../../utils/UnionArray";

export class UserDto extends AuthDto {
  email: string;
  phoneNumber: string;
  alternativeNumber: string;
  name: string;
  isVerified: boolean;
  otp: string;
  id: string;
  favouriteProperties: PropertyDto[];
  avatar: string;

  constructor(user: UserModel) {
    super(user.id, UserType.USER);
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
    this.avatar = user.avatar;
  }
}
