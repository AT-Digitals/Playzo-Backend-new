import { IsDefined, IsEmail, IsOptional } from "class-validator";

export class EnquiryRequestDto {
    @IsDefined({ message: "User Name is required" })
    userName: string;

    @IsDefined({ message: "Please provide an email address" })
    @IsEmail({}, { message: "Please provide a valid email" })
    userEmail: string;
  
    @IsDefined({ message: "phoneNumber is required" })
    phoneNumber: number;

    @IsOptional()
    enquiryMessage?: string;
}
