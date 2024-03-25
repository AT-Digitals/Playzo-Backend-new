import { Body, Get, JsonController, Post, QueryParams } from "routing-controllers";
import { BookingDateFilterRequestDto } from "../../dto/booking/BookingDateFilterRequestDto";
import BookingService from "../../services/booking/BookingService";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import { Service } from "typedi";
import { BookingRequestDto } from "../../dto/booking/BookingRequestDto";

@JsonController("/admin/bookingFilter")
@Service()
export class BookingFilterController {
  constructor(private bookingService: BookingService) {}

  @Get("/filterPaging")
  public async getAllBookings(@QueryParams() query: PaginationRequestDto) {
     const bookings = this.bookingService.getAllBookings(query);
     return bookings;
  }

  @Get("/filterPage")
  public async filterPage(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.bookingService.getBookingFilter(request);
  }

  @Get("/filterBook")
  public async filterBook(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.bookingService.getBookingFilterCount(request);
  }

  @Get("/filterBookings")
  public async filterBookings(@QueryParams() request: BookingDateFilterRequestDto ) {
    return this.bookingService.filterBookings(request);
  }

  @Post("/booked")
  public async getBookedList(@Body() query: BookingRequestDto) {
    const bookings = this.bookingService.getBookedList(query);
    return bookings;
  }



}
