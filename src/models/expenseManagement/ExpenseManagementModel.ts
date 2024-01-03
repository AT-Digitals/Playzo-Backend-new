import { BookingType } from "../booking/BookingType";
import { Document } from "mongoose";
import { PettyCashModel } from "./PettyCashModel";

export interface ExpenseManagementModel extends Document {
  type: BookingType,
    amount: number,
    date: Date,
    pettyCash: PettyCashModel,
    billUrl: string
}