import { Allow, IsDefined, IsEmail, Length } from "class-validator";

export class UserRequestDto {
  @IsDefined({
    message: "Phone number is required",
  })
  @Length(10, 10, { message: "Phone number must be exactly 10 digits" })
  public phoneNumber: string;

  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;

  @IsDefined({ message: "Name is required" })
  name: string;

  @Allow()
  otp: string;
}
