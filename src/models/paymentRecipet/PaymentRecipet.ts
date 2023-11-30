import { Schema, model } from "mongoose";

import { BookingType } from "../booking/BookingType";
import MongoDatabase from "../../utils/MongoDatabase";
import { PaymentRecipetModel } from "./PaymentRecipetModel";

const PaymentRecipetSchema = new Schema({
    url: String,
    type: BookingType,
    user:  {
        type: Schema.Types.ObjectId,
        ref: "users",
        index: true,
      },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "bookings",
        index: true,
      },
});

PaymentRecipetSchema.plugin(MongoDatabase.timeAuditPlugin);

export const PaymentRecipet = model<PaymentRecipetModel>("paymentRecipets", PaymentRecipetSchema);
