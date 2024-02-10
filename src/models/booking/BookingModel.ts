import { BookingType } from "./BookingType";
import { Document } from "mongoose";
import { PaymentType } from "./PaymentType";

export interface BookingModel extends Document {
      type: BookingType,
      user: string;
      dateOfBooking: Date,
      cancelDate?: Date,
      bookingAmount?: {
            online : number, 
            cash: number,
            total: number,
            refund:number
          },
      bookingtype: PaymentType,
      startTime: number,
      endTime: number,
      bookingId?:string,
      startDate:Date,
      endDate:Date,
      duration:number,
      court?: string,
      isAnnual: boolean,
      isRefund?: boolean,
      deleted: boolean

}
