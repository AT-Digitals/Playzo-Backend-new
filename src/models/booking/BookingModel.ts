import { BookingType } from "./BookingType";
import { Document } from "mongoose";
import { PaymentType } from "./PaymentType";

export interface BookingModel extends Document {
    type: BookingType,
      user: string;
      dateOfBooking: Date,
      cancelDate?: Date,
      bookingAmount: number,
      bookingType: PaymentType,
      startTime: number,
      endTime: number,
      deleted: boolean
}
