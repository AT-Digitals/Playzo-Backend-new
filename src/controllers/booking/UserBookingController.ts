import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { Booking } from "../../models/booking/Booking";
import { BookingDto } from "../../dto/booking/BookingDto";
import { BookingRequestDto } from "../../dto/booking/BookingRequestDto";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
// import { BookingDateFilterRequestDto } from "../../dto/booking/BookingDateFilterRequestDto";
// import { BookingUserRequestDto } from "../../dto/booking/BookingUserRequestDto";

@JsonController("/user/bookings")
@Service()
export class UserBookingController {
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
    const booking =  await this.bookingService.findById(bookingId);
    return new BookingDto(booking);
  }

  @Put("/:bookingId")
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


