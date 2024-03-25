import { ArrayMinSize, IsArray } from "class-validator";

export class BulkBookingRequestDto {
  @IsArray()
  @ArrayMinSize(1) // Ensure there's at least one item in the array
  bookings: any[]; 
}