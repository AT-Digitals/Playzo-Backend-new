import { BookingType } from "../booking/BookingType";
import { Document } from "mongoose";
import { UserModel } from "../user/UserModel";

export interface RefundModel extends Document {
  type: BookingType,
    user: UserModel["id"][] | UserModel[],
    refundDate: Date,
    refundAmount: number
}
