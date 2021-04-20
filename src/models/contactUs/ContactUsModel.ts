import { Document } from "mongoose";
import { PropertyModel } from "../property/PropertyModel";

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
  propertyId: PropertyModel["id"] | PropertyModel;
}

export interface ContactUsModel extends Document {
  type: ContactType;
  userDetails: ContactedUserDetails[];
}
