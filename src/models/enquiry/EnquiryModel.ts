import { Document } from "mongoose";

export interface EnquiryModel extends Document {
  userName: string,
  userEmail: string,
  phoneNumber: number, 
  enquiryMessage?: string,
  deleted: boolean;
}
