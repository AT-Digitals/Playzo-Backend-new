import { Body, Get, JsonController, Post, QueryParams } from "routing-controllers";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
import { BookingDateFilterRequestDto } from "../../dto/booking/BookingDateFilterRequestDto";
import { BookedRequestDto } from "../../dto/booking/BookedRequestDto";

@JsonController("/user/bookedFilter")
@Service()
export class BookingFilterController {
  constructor(private bookingService: BookingService) {}

  @Post("/booked")
  public async getBookedList(@Body() query: BookedRequestDto) {
    const bookings = this.bookingService.getBookedList(query);
    return bookings;
  }

  @Get("/filterBookings")
  public async filterBookings(@QueryParams() request: BookingDateFilterRequestDto ) {
    return this.bookingService.filterBookings(request);
  }

  @Get("/filterPage")
  public async filterPage(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.bookingService.getBookingFilter(request);
  }

  @Get("/filterBook")
  public async filterBook(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.bookingService.getBookingFilterCount(request);
  }
}
