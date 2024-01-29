import { Get, JsonController, QueryParams } from "routing-controllers";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import { BookingFilterRequestDto } from "../../dto/Booking/BookingFilterRequestDto";

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
    return this.bookingService.getAllDateFilter(request);
  }

  @Get("/filterBook")
  public async filterBook(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.bookingService.getAllFilter(request);
  }

  @Get("/filterBookings")
  public async filterBookings(@QueryParams() request: BookingFilterRequestDto ) {
    return this.bookingService.filterBookings(request);
  }

  @Get("/filterDateBookings")
  public async filterDateBookings(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.bookingService.filterDateBookings(request);
  }
}
