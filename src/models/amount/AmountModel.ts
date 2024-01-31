import { BookingType } from "../booking/BookingType";
import { Document } from "mongoose";

export interface AmountModel extends Document {
      bookingAmount: number,
      bookingtype: BookingType,
      deleted: boolean

}
