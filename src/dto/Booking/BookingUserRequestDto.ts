import { BookingType } from "../../models/booking/BookingType";
import {
    IsOptional,
} from "class-validator";
import { PaymentType } from "../../models/booking/PaymentType";

export class BookingUserRequestDto {

    // @IsEnum(BookingType, { message: "Please provide a valid Booking Type" })
    type: BookingType;
  
    // @IsDefined({ message: "Date is required" })
    @IsOptional()
    cancelDate?: Date;
    
    @IsOptional()
    bookingAmount?: {
        online : number, 
        cash: number,
        total: number,
        refund:number
      };
  
    // @IsEnum(PaymentType, { message: "Please provide a valid Payment Type" })
    bookingtype: PaymentType;

    // @IsDefined({ message: "starttime is required" })
    startTime: number;

    // @IsDefined({ message: "endtime is required" })
    endTime: number;
    
    // @IsDefined({ message: "user Id is required" })
    user:string;

    @IsOptional()
    bookingId?: string;

    // @IsDefined({ message: "Start Date is required" })
    startDate: string;

    // @IsDefined({ message: "End Date is required" })
    endDate:Date;

    @IsOptional()
    court?:string;

    @IsOptional()
    isRefund?:string;
  }