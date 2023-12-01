import { Schema, model } from "mongoose";

import { BookingModel } from "./BookingModel";
import { BookingType } from "./BookingType";
import MongoDatabase from "../../utils/MongoDatabase";
import { PaymentType } from "./PaymentType";

const bookingSchema = new Schema({
    type: {
        type: String,
        enum: [],
        default: BookingType.turf,
      },
      user: [
        {
          type: Schema.Types.ObjectId,
          ref: "users",
          index: true,
        },
      ],
      dateOfBookin:Date,
      cancelDate:Date,
      bookingAmount: String,
      bookingtype:PaymentType,
      startTime: String,
      endTime: String,

});

bookingSchema.plugin(MongoDatabase.timeAuditPlugin);

export const Booking = model<BookingModel>("bookings", bookingSchema);
