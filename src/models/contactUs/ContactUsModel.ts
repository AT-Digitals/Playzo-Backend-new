import { Document } from "mongoose";
import { PropertyModel } from "../property/PropertyModel";
import { UserModel } from "../user/UserModel";

export enum ContactType {
  Agent = "Agent",
  Seller = "Seller",
  Enquiry = "Enquiry",
}

export interface PropertiesInfo {
  property: PropertyModel["id"] | PropertyModel;
  timeStamp: Date;
}

export interface ContactUsModel extends Document {
  type: ContactType;
  user: UserModel["id"] | UserModel;
  propertiesInfo: PropertiesInfo[];
  place: string;
  timeStamp: string;
}
