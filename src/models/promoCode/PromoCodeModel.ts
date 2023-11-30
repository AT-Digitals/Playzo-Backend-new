import { BookingType } from "../booking/BookingType";
import { Document } from "mongoose";
import { StatusType } from "./StatusType";

export interface PromoCodeModel extends Document {
    code: string,
    status: StatusType,
    type: BookingType,
    discountPercentage: number
}
