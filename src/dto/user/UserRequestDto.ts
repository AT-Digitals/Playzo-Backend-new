import {
  IsDefined,
  IsEmail,
  MinLength,
} from "class-validator";

export class UserRequestDto {
  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;

  @IsDefined({ message: "Password is required" })
  @MinLength(6, { message: "Password must be atleast 6 chars long" })
  password: string;

  @IsDefined({ message: "Name is required" })
  name: string;
 
}
