import { Schema, model } from "mongoose";

import { BookingType } from "../booking/BookingType";
import MongoDatabase from "../../utils/MongoDatabase";
import { PromoCodeModel } from "./PromoCodeModel";
import { StatusType } from "./StatusType";

const promoCodeSchema = new Schema({
    code: String,
    type: BookingType,
    status: StatusType,
    discountPercentage: Number
});

promoCodeSchema.plugin(MongoDatabase.timeAuditPlugin);

export const PromoCode = model<PromoCodeModel>("promoCodes", promoCodeSchema);
