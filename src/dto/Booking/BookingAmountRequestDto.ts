import {
    IsOptional,
} from "class-validator";

export class BookingAmountRequestDto {
    
    @IsOptional()
    bookingAmount: {
        online : number, 
        cash: number,
        total: number 
      };

  }