import { AmountModel } from "../../models/amount/AmountModel";
import { BookingType } from "../../models/booking/BookingType";

export class AmountDto {
  id: string;
  bookingAmount: number;
  bookingType:BookingType;
  deleted: boolean;

  constructor(booking: AmountModel) {
      this.id = booking.id;
      this.bookingAmount = booking.bookingAmount;
      this.bookingType = booking.bookingtype;
      this.deleted = booking.deleted;
  }
}
