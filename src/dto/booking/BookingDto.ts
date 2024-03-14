import { BookingModel } from "../../models/booking/BookingModel";
import { BookingType } from "../../models/booking/BookingType";
import { PaymentType } from "../../models/booking/PaymentType";
import { UserBookingType } from "../../models/booking/UserBookingType";

export class BookingDto {
  id: string;
  type:BookingType;
  user: string;
  dateOfBooking: Date;
  cancelDate?: Date;
  bookingAmount?: {
    online: number, 
    cash: number,
    total: number,
    refund:number,
    upi:number
  };
  bookingtype:PaymentType;
  userBookingType:UserBookingType;
  startTime: number;
  endTime: number;
  bookingId?:string;
  startDate: Date;
  endDate:Date;
  duration:number;
  court: string;
  isAnnual: boolean;
  numberOfPerson?:number;
  membership:boolean;
  isRefund?: boolean;
  deleted: boolean;

  constructor(booking: BookingModel) {
    this.id = booking.id;
    this.type = booking.type;
    this.user = JSON.stringify(booking.user ? booking.user : booking.admin);
    this.dateOfBooking = booking.dateOfBooking;
    this.cancelDate = booking.cancelDate;
    this.bookingAmount = booking.bookingAmount;
    this.bookingtype = booking.bookingtype;
    this.userBookingType = booking.userBookingType;
    this.startTime = booking.startTime;
    this.endTime = booking.endTime;
    this.deleted = booking.deleted;
    this.bookingId = booking.bookingId;
    this.startDate = booking.startDate;
    this.endDate = booking.endDate;
    this.duration = booking.duration;
    this.court = booking.court;
    this.numberOfPerson = booking.numberOfPerson;
    this.isRefund = booking.isRefund;
    this.isAnnual = booking.isAnnual;
    this.membership = booking.membership;
  }
}
