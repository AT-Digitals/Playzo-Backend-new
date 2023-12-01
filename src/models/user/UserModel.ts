import { BookingModel } from "../booking/BookingModel";
import { Document } from "mongoose";

export interface UserModel extends Document {
  email: string;
  name: string;
  password: string;
  bookingHistory: BookingModel["id"][] | BookingModel[];
  setPassword(password: string): Promise<void>;
  validateUser(password: string): Promise<boolean>;
}
