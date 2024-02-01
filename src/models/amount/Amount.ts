import { Schema, model } from "mongoose";

import { AmountModel } from "./AmountModel";
import { BookingType } from "../booking/BookingType";
import MongoDatabase from "../../utils/MongoDatabase";

const amountSchema = new Schema({

      bookingtype:{
        type: String,
        enum: [],
        default: BookingType.Turf,
      },
      bookingAmount: String,
      court: Number,
      deleted: Boolean

});

amountSchema.plugin(MongoDatabase.timeAuditPlugin);

export const Amount = model<AmountModel>("amount", amountSchema);
