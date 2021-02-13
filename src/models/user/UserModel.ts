import { Document } from "mongoose";
import { PropertyModel } from "../property/PropertyModel";

export interface UserModel extends Document {
  email: string;
  phoneNumber: string;
  name: string;
  isVerified: boolean;
  otp: string;
  favouriteProperties: PropertyModel["id"][] | PropertyModel[];
}
