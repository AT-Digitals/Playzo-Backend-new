import {
    IsDefined,
    IsOptional,
} from "class-validator";

import { BookingType } from "../../models/booking/BookingType";
import PaginationRequestDto from "../PaginationRequestDto";

export class BookingFilterRequestDto extends PaginationRequestDto {
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