import { Document } from "mongoose";

export interface UserModel extends Document {
  email: string;
  phoneNumber: string;
  name: string;
  isVerified: boolean;
  otp: string;
}
