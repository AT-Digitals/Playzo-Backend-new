import {
    IsDefined
} from "class-validator";

export class BookingDateFilterRequestDto {
  
    @IsDefined({ message: "Booking start Date is required" })
    startDate: Date;

    @IsDefined({ message: "Booking end Date is required" })
    endDate: Date;

    @IsDefined({ message: "Booking start Time is required" })
    startTime: number;

    @IsDefined({ message: "Booking end Time is required" })
    endTime: number;
   
  }