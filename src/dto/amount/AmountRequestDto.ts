import {
    Allow,
    IsEnum,
} from "class-validator";

import { BookingType } from "../../models/booking/BookingType";

export class AmountRequestDto {
    
    @Allow()
    bookingAmount: number;
  
    @IsEnum(BookingType, { message: "Please provide a valid Payment Type" })
    bookingtype: BookingType;
  }