import {
    IsDefined,
    IsOptional,
} from "class-validator";

import { BookingType } from "../../models/booking/BookingType";

export class BookingFilterRequestDto {
 @IsOptional()
    // @IsEnum(BookingType, { message: "Please provide a valid Booking Type" })
    type?: BookingType;
  
    @IsDefined({ message: "Booking Date is required" })
    dateOfBooking: string;

    @IsOptional()
    startTime?: number;
    
    @IsOptional()
    endTime?: number;
  }