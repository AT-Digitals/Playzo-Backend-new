import { PaymentType } from "../booking/PaymentType";
import { Schema } from "mongoose";

export const PettyCashSchema = new Schema({
    name: String,
  paymentType: PaymentType
  });
