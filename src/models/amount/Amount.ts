import { Schema, model } from "mongoose";

import { AmountModel } from "./AmountModel";
import MongoDatabase from "../../utils/MongoDatabase";
import { PaymentType } from "../booking/PaymentType";

const amountSchema = new Schema({

      bookingId: {
        type: Schema.Types.ObjectId,
        ref: "bookings"
    },
     
      bookingtype:{
        type: String,
        enum: [],
        default: PaymentType.Cash,
      },
      bookingAmount: String,
      deleted: Boolean

});

amountSchema.plugin(MongoDatabase.timeAuditPlugin);

export const Amount = model<AmountModel>("amount", amountSchema);
