import { Document } from "mongoose";

export interface AdminUserModel extends Document {
  email: string;
  phoneNumber: string;
  name: string;
  profilePic: string;
  password: string;
  setPassword(password: string): Promise<void>;
  validateUser(password: string): Promise<boolean>;
}
