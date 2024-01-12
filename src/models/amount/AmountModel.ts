import { Document } from "mongoose";
import { PaymentType } from "../booking/PaymentType";

export interface AmountModel extends Document {
      bookingId: string;
      bookingAmount: number,
      bookingtype: PaymentType,
      deleted: boolean

}
