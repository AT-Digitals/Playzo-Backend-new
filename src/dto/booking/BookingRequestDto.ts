import {
    IsDefined,
    IsEnum,
    IsOptional,
} from "class-validator";

import { BookingType } from "../../models/booking/BookingType";
import { PaymentType } from "../../models/booking/PaymentType";
import { UserBookingType } from "../../models/booking/UserBookingType";

export class BookingRequestDto {

    @IsEnum(BookingType, { message: "Please provide a valid Service Type" })
    type: BookingType;
  
    // @IsDefined({ message: "Date is required" })
    @IsOptional()
    cancelDate?: Date;
    
    @IsOptional()
    bookingAmount?: {
        online : number, 
        cash: number,
        total: number,
        refund:number,
        upi:number
      };
  
    @IsEnum(PaymentType, { message: "Please provide a valid Payment Type" })
    bookingtype: PaymentType;

    @IsEnum(UserBookingType, { message: "Please provide a valid booking Type" })
    userBookingType: UserBookingType;

    @IsDefined({ message: "starttime is required" })
    startTime: number;

    @IsDefined({ message: "endtime is required" })
    endTime: number;
    
    @IsDefined({ message: "user is required" })
    user:string;
    
    @IsOptional()
    bookingId?: string;

    @IsDefined({ message: "Start Date is required" })
    startDate: string;

    @IsDefined({ message: "End Date is required" })
    endDate:Date;

    @IsDefined({ message: "ServiceType is required" })
    court:string;

    @IsOptional()
    isRefund?:string;

    @IsOptional()
    numberOfPerson?:number;
    
    @IsOptional()
    membership?:boolean;

    @IsOptional()
    connectId?:string;
  }