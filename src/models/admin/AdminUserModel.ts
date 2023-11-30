import { Document } from "mongoose";

export interface AdminUserModel extends Document {
  email: string;
  name: string;
  password: string;
  setPassword(password: string): Promise<void>;
  validateUser(password: string): Promise<boolean>;
}
