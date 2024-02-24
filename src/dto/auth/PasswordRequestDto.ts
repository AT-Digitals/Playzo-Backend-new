import { IsDefined, MinLength } from "class-validator";

export default class PasswordRequestDto {
  @IsDefined({ message: "Please provide password" })
  @MinLength(8, {
    message: "Please provide a password with atleast 8 characters",
  })
  password: string;
}