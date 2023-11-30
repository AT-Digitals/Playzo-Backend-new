import { BookingModel } from "../booking/BookingModel";
import { BookingType } from "../booking/BookingType";
import { Document } from "mongoose";
import { UserModel } from "../user/UserModel";

export interface PaymentRecipetModel extends Document {
    url: string,
    type: BookingType,
    user: UserModel["id"][] | UserModel[],
    bookingId: BookingModel["id"][] | BookingModel[],
}