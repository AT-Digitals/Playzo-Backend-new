import { Schema, model } from "mongoose";

import { BookingModel } from "./BookingModel";
import { BookingType } from "./BookingType";
import MongoDatabase from "../../utils/MongoDatabase";
import { PaymentType } from "./PaymentType";

const bookingSchema = new Schema({
    type: {
        type: String,
        enum: [],
        default: BookingType.Turf,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "admins"
    },
      dateOfBooking:Date,
      cancelDate:Date,
      bookingAmount: String,
      bookingtype:{
        type: String,
        enum: [],
        default: PaymentType.Cash,
      },
      startTime: Number,
      endTime: Number,
      bookingId:String

});

bookingSchema.plugin(MongoDatabase.timeAuditPlugin);

export const Booking = model<BookingModel>("bookings", bookingSchema);
