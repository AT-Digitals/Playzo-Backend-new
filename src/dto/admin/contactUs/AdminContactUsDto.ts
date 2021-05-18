import { ContactType } from "../../../models/contactUs/ContactUsModel";

export interface AdminContactUsPropInfoDto {
  property: {
    name: string;
    city: string;
    subLocation: string;
  };
  timeStamp: number;
  date: Date;
}
export interface AdminContactUsDto {
  name: string;
  email: string;
  place: string;
  phone: string;
  type: ContactType;
  timeStamp: number;
  properties: AdminContactUsPropInfoDto[];
}
