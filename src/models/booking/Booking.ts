import { Schema, model } from "mongoose";

import { BookingAmount } from "./BookingAmount";
import { BookingModel } from "./BookingModel";
import { BookingType } from "./BookingType";
import MongoDatabase from "../../utils/MongoDatabase";
import { PaymentType } from "./PaymentType";
import { UserBookingType } from "./UserBookingType";

const bookingSchema = new Schema({
    type: {
        type: String,
        enum: [],
        default: BookingType.Turf,
      },
    //   admin: {
    //     type: Schema.Types.ObjectId,
    //     ref: "admins",
    //     require:false
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: "admins",
      // require:false
  },
      bookingtype:{
        type: String,
        enum: [],
        default: PaymentType.Cash,
      },
      bookingAmount: BookingAmount,
      userBookingType: {
        type: String,
        enum: [],
        default: UserBookingType.Manual,
      },
      dateOfBooking:Date,
      startDate:Date,
      endDate:Date,
      startTime: Number,
      endTime: Number,
      bookingId:String,
      cancelDate:Date,
      duration:Number,
      court: String,
      isAnnual: Boolean,
      isRefund: Boolean,
      deleted: Boolean

});

bookingSchema.plugin(MongoDatabase.timeAuditPlugin);

export const Booking = model<BookingModel>("bookings", bookingSchema);
