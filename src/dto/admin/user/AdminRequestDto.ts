import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  MinLength
} from "class-validator";

import { UserType } from "../../auth/UserType";

export class AdminRequestDto {
  @IsDefined({
    message: "Phone number is required"
  })
  @Length(10, 10, { message: "Phone number must be exactly 10 digits" })
  public phoneNumber: string;

  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;

  @IsDefined({ message: "Password is required" })
  @MinLength(6, { message: "Password must be atleast 6 chars long" })
  password: string;

  @IsDefined({ message: "Name is required" })
  name: string;

  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(UserType, { message: "Please provide a valid role" })
  role: UserType;
}
