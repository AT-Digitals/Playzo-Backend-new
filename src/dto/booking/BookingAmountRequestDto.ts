import { IsOptional } from "class-validator";

export class BookingAmountRequestDto {  
    @IsOptional()
    bookingAmount: {
        online : number, 
        cash: number,
        total: number,
        refund:number
      };
    @IsOptional()
    isRefund: boolean;
}