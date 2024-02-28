import { BookingModel } from "../booking/BookingModel";
import { Document } from "mongoose";
import { UserType } from "../../dto/auth/UserType";

export interface UserModel extends Document {
  email: string;
  name: string;
  password: string;
  phone:number;
  userType:UserType;
  interestedSports?:string[];
  bookingHistory: BookingModel["id"][] | BookingModel[];
  setPassword(password: string): Promise<void>;
  validateUser(password: string): Promise<boolean>;
}
