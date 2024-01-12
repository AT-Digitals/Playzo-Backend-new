import { AmountModel } from "../../models/amount/AmountModel";
import { PaymentType } from "../../models/booking/PaymentType";

export class AmountDto {
  id: string;
  bookingId: string;
  bookingAmount: number;
  bookingType:PaymentType;
  deleted: boolean;

  constructor(booking: AmountModel) {
      this.id = booking.id;
      this.bookingId = JSON.stringify(booking.bookingId);
      this.bookingAmount = booking.bookingAmount;
      this.bookingType = booking.bookingtype;
      this.deleted = booking.deleted;
  }
}
