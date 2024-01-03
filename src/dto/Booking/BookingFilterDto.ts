import { BookingType } from "../../models/booking/BookingType";

export class BookingFilterDto {
  
  type:BookingType;
 
  dateOfBooking: Date;

  startTime: number;
      endTime: number;

}
