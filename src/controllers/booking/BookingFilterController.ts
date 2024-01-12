import { Get, JsonController, QueryParams } from "routing-controllers";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";
import { BookingFilterRequestDto } from "../../dto/Booking/BookingFilterRequestDto";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
import PaginationRequestDto from "../../dto/PaginationRequestDto";

@JsonController("/bookingFilter")
@Service()
export class BookingFilterController {
  constructor(private bookingService: BookingService) {}

  @Get("/filterBookings")
  public async filterBookings(@QueryParams() request: BookingFilterRequestDto ) {
    return this.bookingService.filterBookings(request);
  }

  @Get("/filterPaging")
  public async getAllBookings(@QueryParams() query: PaginationRequestDto) {
     const bookings = this.bookingService.getAllBookings(query);
     return bookings;
  }

  @Get("/filterDateBookings")
  public async filterDateBookings(@QueryParams() request: BookingDateFilterRequestDto) {
   console.log("cont")
    return this.bookingService.filterDateBookings(request);
  }
}
