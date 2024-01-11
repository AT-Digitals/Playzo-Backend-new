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
     
      bookingtype:{
        type: String,
        enum: [],
        default: PaymentType.Cash,
      },
      bookingAmount: String,
      dateOfBooking:Date,
      startDate:Date,
      endDate:Date,
      startTime: Number,
      endTime: Number,
      bookingId:String,
      cancelDate:Date,
      duration:String,
      court: String,
      isAnnual: Boolean,
      deleted: Boolean

});

bookingSchema.plugin(MongoDatabase.timeAuditPlugin);

export const Booking = model<BookingModel>("bookings", bookingSchema);
