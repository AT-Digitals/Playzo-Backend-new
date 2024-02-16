import { Body, Get, JsonController, Post, QueryParams } from "routing-controllers";
import { BookingRequestDto } from "../../dto/booking/BookingRequestDto";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
import { BookingDateFilterRequestDto } from "../../dto/booking/BookingDateFilterRequestDto";

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

  @Get("/filterBookings")
  public async filterBookings(@QueryParams() request: BookingDateFilterRequestDto ) {
    return this.bookingService.filterBookings(request);
  }
}
