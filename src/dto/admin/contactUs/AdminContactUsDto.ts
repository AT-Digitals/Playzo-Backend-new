import { ContactType } from "../../../models/contactUs/ContactUsModel";

export interface AdminContactUsPropInfoDto {
  property: {
    name: string;
    city: string;
    subLocation: string;
    date: Date;
    dateString: string;
    timeStamp: number;
  };
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
