import { Document } from "mongoose";
import { PaymentType } from "../booking/PaymentType";

export interface PettyCashModel extends Document {
    name: string,
    paymentType: PaymentType
}