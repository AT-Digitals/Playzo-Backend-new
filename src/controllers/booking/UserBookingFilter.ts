import { Body, JsonController, Post } from "routing-controllers";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
import { BookingRequestDto } from "../../dto/booking/BookingRequestDto";

@JsonController("/user/bookedFilter")
@Service()
export class BookingFilterController {
  constructor(private bookingService: BookingService) {}

  @Post("/booked")
  public async getBookedList(@Body() query: BookingRequestDto) {
    console.log("query",query)
     const bookings = this.bookingService.getBookedList(query);
     return bookings;
  }



}
