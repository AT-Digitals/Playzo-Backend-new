import { IsDefined, IsEmail } from "class-validator";

export class AdminLoginDto {
  @IsDefined({ message: "Email is required" })
  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;

  @IsDefined({ message: "Password is required" })
  password: string;
}
