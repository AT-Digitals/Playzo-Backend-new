import { Get, JsonController, QueryParams } from "routing-controllers";
import { BookingDateFilterRequestDto } from "../../dto/booking/BookingDateFilterRequestDto";
import BookingService from "../../services/booking/BookingService";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import { Service } from "typedi";

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
    return this.bookingService.getBookingFilter(request, true);
  }

  @Get("/filterBook")
  public async filterBook(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.bookingService.getBookingFilterCount(request, true);
  }

  @Get("/filterBookings")
  public async filterBookings(@QueryParams() request: BookingDateFilterRequestDto ) {
    return this.bookingService.filterBookings(request);
  }

}
