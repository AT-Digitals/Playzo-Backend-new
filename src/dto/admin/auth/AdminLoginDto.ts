import { IsDefined, Length } from "class-validator";

export class AdminLoginDto {
  @IsDefined({
    message: "Phone number is required"
  })
  @Length(10, 10, { message: "Phone number must be exactly 10 digits" })
  phoneNumber: string;

  @IsDefined({ message: "Password is required" })
  password: string;
}
