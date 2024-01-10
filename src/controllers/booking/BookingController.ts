import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParams } from "routing-controllers";
import { Booking } from "../../models/booking/Booking";
import { BookingDto } from "../../dto/Booking/BookingDto";
import { BookingRequestDto } from "../../dto/Booking/BookingRequestDto";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
import PaginationRequestDto from "../../dto/PaginationRequestDto";

@JsonController("/bookings")
@Service()
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async create(
    // @CurrentUser() user: AuthDto,
    @Body() request: BookingRequestDto
  ) {
    console.log("con",request);
    const booking = await this.bookingService.create(request);
    return new BookingDto(booking);
  }

  @Get("/:bookingId")
  public async findById(@Param("bookingId") bookingId: string) {
    const booking =  this.bookingService.findById(bookingId);
    return new Booking(booking);
  }

  @Get()
  public async getAllBookings(@QueryParams() query: PaginationRequestDto) {
     const bookings = this.bookingService.getAllBookings(query);
     return bookings;
  }

  @Put()
  public async updateById(
    @Param("bookingId") bookingId: string,
    @Body() newPrice: BookingRequestDto
  ) {
    const booking = await this.bookingService.updateById(bookingId, newPrice);
    return new Booking(booking);
  }

  @Delete()
  public async deleteById(@Param("bookingId") bookingId: string) {
    const booking = await this.bookingService.deleteById(bookingId);
    return new Booking(booking);
  }
}
