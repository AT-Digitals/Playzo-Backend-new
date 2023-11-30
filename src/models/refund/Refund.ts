import { Schema, model } from "mongoose";

import { BookingType } from "../booking/BookingType";
import MongoDatabase from "../../utils/MongoDatabase";
import { RefundModel } from "./RefundModel";

const RefundSchema = new Schema({
    type: BookingType,
    user:  {
        type: Schema.Types.ObjectId,
        ref: "users",
        index: true,
      },
    refundDate: Date,
    refundAmount: Number,
});

RefundSchema.plugin(MongoDatabase.timeAuditPlugin);

export const Refund = model<RefundModel>("refunds", RefundSchema);
