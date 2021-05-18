import { Allow, IsDefined, IsEmail } from "class-validator";

import { ContactType } from "../../../models/contactUs/ContactUsModel";

export class ContactUsRequestDto {
  @IsDefined({ message: "type is required" })
  type: ContactType;

  @IsDefined({ message: "Name is required" })
  name: string;

  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;

  @IsDefined({ message: "Place is required" })
  place: string;

  @IsDefined({ message: "phone is required" })
  phone: string;

  @Allow()
  propertyId: string;

  @Allow()
  userId: string;
}
