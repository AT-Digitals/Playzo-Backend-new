import { BookingModel } from "../../models/booking/BookingModel";
import { BookingType } from "../../models/booking/BookingType";
import { PaymentType } from "../../models/booking/PaymentType";

export class BookingDto {
  id: string;
  type:BookingType;
  user: string;
  dateOfBooking: Date;
  cancelDate?: Date;
  bookingAmount?: {
    online: number, 
    cash: number,
    total: number 
  };
  bookingtype:PaymentType;
  startTime: number;
  endTime: number;
  bookingId?:string;
  startDate: Date;
  endDate:Date;
  duration:string;
  court?: string;
  isAnnual: boolean;
  deleted: boolean;

  constructor(booking: BookingModel) {
    this.id = booking.id;
    this.type = booking.type;
    this.user = 
    JSON.stringify(booking.user);
      this.dateOfBooking = booking.dateOfBooking;
      this.cancelDate = booking.cancelDate;
      this.bookingAmount = booking.bookingAmount;
      this.bookingtype = booking.bookingtype;
      this.startTime = booking.startTime;
      this.endTime = booking.endTime;
      this.deleted = booking.deleted;
      this.bookingId = booking.bookingId;
      this.startDate = booking.startDate;
      this.endDate = booking.endDate;
      this.duration = booking.duration;
      this.court = booking.court;
      this.isAnnual = booking.isAnnual;
  }
}
