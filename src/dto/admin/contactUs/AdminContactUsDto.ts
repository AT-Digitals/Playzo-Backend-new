import { ContactType } from "../../../models/contactUs/ContactUsModel";

export interface AdminContactUsDto {
  name: string;
  email: string;
  place: string;
  phone: string;
  type: ContactType;
}
