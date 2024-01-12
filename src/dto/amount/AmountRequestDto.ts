import {
    Allow,
    IsDefined,
    IsEnum,
} from "class-validator";

import { PaymentType } from "../../models/booking/PaymentType";

export class AmountRequestDto {
    
    @Allow()
    bookingAmount: number;
  
    @IsEnum(PaymentType, { message: "Please provide a valid Payment Type" })
    bookingtype: PaymentType;
    
    @IsDefined({ message: "Booking Date is required" })
    bookingId:string;

  }