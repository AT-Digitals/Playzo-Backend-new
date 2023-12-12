import { Service } from "typedi";
import { Body, Get, JsonController, QueryParams } from "routing-controllers";
import BookingService from "../../services/booking/BookingService";
import { BookingFilterRequestDto } from "../../dto/Booking/BookingFilterRequestDto";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";

@JsonController("/bookingFilter")
@Service()
export class BookingFilterController {
  constructor(private bookingService: BookingService) {}

  @Get("/filterBookings")
  public async filterBookings(@QueryParams() request: BookingFilterRequestDto ) {
    return this.bookingService.filterBookings(request);
  }

  @Get("/filterDateBookings")
  public async filterDateBookings(@Body() request: BookingDateFilterRequestDto) {
    return this.bookingService.filterDateBookings(request);
  }
}
