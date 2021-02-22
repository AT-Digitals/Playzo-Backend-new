import { Document } from "mongoose";

export enum ContactType {
  Agent = "Agent",
  Seller = "Seller",
  Enquiry = "Enquiry",
}

export interface ContactedUserDetails {
  name: string;
  email: string;
  place: string;
  phone: string;
}

export interface ContactUsModel extends Document {
  type: ContactType;
  userDetails: ContactedUserDetails[];
}
