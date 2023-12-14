import { BookingModel } from "../../models/booking/BookingModel";
import { BookingType } from "../../models/booking/BookingType";
import { PaymentType } from "../../models/booking/PaymentType";

export class BookingDto {
  id: string;
  type:BookingType;
  user: string;
  dateOfBooking: Date;
  cancelDate?: Date;
  bookingAmount: number;
  bookingType:PaymentType;
  deleted: boolean;
  startTime: number;
      endTime: number;

  constructor(booking: BookingModel) {
    this.id = booking.id;
    this.type = booking.type;
    this.user = booking.user;
      this.dateOfBooking = booking.dateOfBooking;
      this.cancelDate = booking.cancelDate;
      this.bookingAmount = booking.bookingAmount;
      this.bookingType = booking.bookingType;
      this.startTime = booking.startTime;
      this.endTime = booking.endTime;
      this.deleted = booking.deleted;
  }
}
