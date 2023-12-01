import {
    Allow,
    IsDefined,
    IsEnum,
} from "class-validator";

import { BookingType } from "../../models/booking/BookingType";
import { PaymentType } from "../../models/booking/PaymentType";

export class BookingRequestDto {

    @IsEnum(BookingType, { message: "Please provide a valid Booking Type" })
    type: BookingType;
  
    @IsDefined({ message: "Date is required" })
    dateOfBooking: Date;
  
    @IsDefined({ message: "Date is required" })
    cancelDate: Date;
  
    @Allow()
    bookingAmount: number;
  
    @IsEnum(PaymentType, { message: "Please provide a valid Payment Type" })
    bookingType: PaymentType;
  }