import {
    IsDefined,
    IsOptional
} from "class-validator";

import { BookingType } from "../../models/booking/BookingType";
import PaginationRequestDto from "../PaginationRequestDto";
import { PaymentType } from "../../models/booking/PaymentType";

export class BookingDateFilterRequestDto extends PaginationRequestDto {
  
    @IsOptional()
    startDate?: Date;

    @IsOptional()
    endDate?: Date;

    @IsOptional()
    startTime?: number;
    
    @IsOptional() @IsDefined({ message: "Booking end Time is required" })
    endTime?: number;

    @IsOptional()
    // @IsEnum(BookingType, { message: "Please provide a valid Booking Type" })
    type?: BookingType;

    @IsOptional()
    bookingtype?: PaymentType;
   
  }