import { Service } from "typedi";
import { BookingRequestDto } from "../../dto/Booking/BookingRequestDto";
import { Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import BookingService from "../../services/booking/BookingService";
import { Booking } from "../../models/booking/Booking";
import { BookingDto } from "../../dto/Booking/BookingDto";
import { AuthDto } from "../../dto/auth/AuthDto";

@JsonController("/bookings")
@Service()
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async create(
    @CurrentUser() user: AuthDto,
    @Body() request: BookingRequestDto
  ) {
    const booking = await this.bookingService.create(request,user.id);
    return new BookingDto(booking);
  }

  @Get("/:bookingId")
  public async findById(@Param("bookingId") bookingId: string) {
    const booking =  this.bookingService.findById(bookingId);
    return new Booking(booking);
  }

  @Get("/getAll")
  public async getAllBookings() {
    return this.bookingService.getAllBookings();
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
