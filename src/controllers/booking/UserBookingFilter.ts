import { Body, JsonController, Post } from "routing-controllers";
import { BookingRequestDto } from "../../dto/booking/BookingRequestDto";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";

@JsonController("/user/bookedFilter")
@Service()
export class BookingFilterController {
  constructor(private bookingService: BookingService) {}

  @Post("/booked")
  public async getBookedList(@Body() query: BookingRequestDto) {
    console.log("query",query);
     const bookings = this.bookingService.getBookedList(query);
     return bookings;
  }
}
