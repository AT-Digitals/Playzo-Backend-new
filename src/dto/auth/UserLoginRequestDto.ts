import { IsDefined, IsEmail, MinLength } from "class-validator";

export default class UserLoginRequestDto {
  @IsDefined({ message: "Please provide an email address" })
  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;

  @IsDefined({ message: "Please provide password" })
  @MinLength(8, {
    message: "Please provide a password with atleast 8 characters",
  })
  password: string;
}
