import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
} from "class-validator";

import { AccessType } from "../auth/AccessType";

export class AdminRequestDto {
  
  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;

  @IsDefined({ message: "Password is required" })
  @MinLength(6, { message: "Password must be atleast 6 chars long" })
  password: string;

  @IsDefined({ message: "Name is required" })
  name: string;
  
  @IsDefined({ message: "Phone number is required" })
  phone: number;

  @IsOptional()
  @IsEnum(AccessType, { message: "Please provide a valid Booking Type" })
  accessType?: AccessType;
 
}
