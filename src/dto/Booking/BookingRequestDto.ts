import {
    Allow,
    IsDefined,
    IsEnum,
    IsOptional,
} from "class-validator";

import { BookingType } from "../../models/booking/BookingType";
import { PaymentType } from "../../models/booking/PaymentType";

export class BookingRequestDto {

    @IsEnum(BookingType, { message: "Please provide a valid Booking Type" })
    type: BookingType;
  
    // @IsDefined({ message: "Date is required" })
    @IsOptional()
    cancelDate?: Date;
    
    @Allow()
    bookingAmount: number;
  
    @IsEnum(PaymentType, { message: "Please provide a valid Payment Type" })
    bookingtype: PaymentType;

    @IsDefined({ message: "starttime is required" })
    startTime: number;

    @IsDefined({ message: "endtime is required" })
    endTime: number;
    
    @IsDefined({ message: "Booking Date is required" })
    user:string;

    @IsOptional()
    bookingId?: string;

    @IsDefined({ message: "Start Date is required" })
    startDate: string;

    @IsDefined({ message: "End Date is required" })
    endDate:Date;

    @IsOptional()
    court?:string;
  }