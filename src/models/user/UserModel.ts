import { Document } from "mongoose";
import { PropertyModel } from "../property/PropertyModel";

export interface UserDeviceInfo {
  os: string;
  browser: string;
}
export interface UserModel extends Document {
  email: string;
  phoneNumber: string;
  alternativeNumber: string;
  name: string;
  isVerified: boolean;
  otp: string;
  favouriteProperties: PropertyModel["id"][] | PropertyModel[];
  assistedProperties: PropertyModel["id"][] | PropertyModel[];
  avatar: string;
  accountCreationTimeStamp: Date;
  lastLoginTimeStamp: Date;
  userLocation: string;
  userDeviceInfo: UserDeviceInfo;
}
