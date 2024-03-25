import {
    IsDefined,
    IsEnum,
    IsOptional,
} from "class-validator";

import { BookingType } from "../../models/booking/BookingType";
import { PaymentType } from "../../models/booking/PaymentType";

export class BookedRequestDto {

    @IsEnum(BookingType, { message: "Please provide a valid Service Type" })
    type: BookingType;
  
    @IsEnum(PaymentType, { message: "Please provide a valid Payment Type" })
    bookingtype: PaymentType;

    @IsDefined({ message: "starttime is required" })
    startTime: number;

    @IsDefined({ message: "endtime is required" })
    endTime: number;
    
    @IsDefined({ message: "user is required" })
    user:string;


    @IsDefined({ message: "Start Date is required" })
    startDate: string;

    @IsDefined({ message: "End Date is required" })
    endDate:Date;

    @IsDefined({ message: "ServiceType is required" })
    court:string;

    @IsOptional()
    membership?:boolean;
  
  }