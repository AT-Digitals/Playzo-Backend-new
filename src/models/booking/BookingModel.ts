import { BookingType } from "./BookingType";
import { Document } from "mongoose";
import { PaymentType } from "./PaymentType";
import { UserModel } from "../user/UserModel";

export interface BookingModel extends Document {
    type: BookingType,
      user: UserModel["id"][] | UserModel[];
      dateOfBooking: Date,
      cancelDate?: Date,
      bookingAmount: number,
      bookingType: PaymentType,
      startTime: number,
      endTime: number,
      deleted: boolean
}
