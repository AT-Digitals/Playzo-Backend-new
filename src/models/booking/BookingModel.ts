import { BookingType } from "./BookingType";
import { Document } from "mongoose";
import { PaymentType } from "./PaymentType";

export interface BookingModel extends Document {
      type: BookingType,
      user: string;
      dateOfBooking: Date,
      cancelDate?: Date,
      bookingAmount: number,
      bookingtype: PaymentType,
      startTime: number,
      endTime: number,
      bookingId?:string,
      startDate:Date,
      endDate:Date,
      duration:string,
      court?: string,
      isAnnual: boolean,
      deleted: boolean

}
