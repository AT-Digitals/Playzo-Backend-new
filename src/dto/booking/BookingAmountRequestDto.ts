import { IsOptional } from "class-validator";

export class BookingAmountRequestDto {  
    @IsOptional()
    bookingAmount: {
        online : number, 
        cash: number,
        total: number,
        refund:number,
        upi:number
      };
    @IsOptional()
    isRefund: boolean;
}