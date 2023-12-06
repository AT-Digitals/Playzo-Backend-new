import { Service } from "typedi";
import { BookingRequestDto } from "../../dto/Booking/BookingRequestDto";
import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import BookingService from "../../services/booking/BookingService";
import { Booking } from "../../models/booking/Booking";
import { BookingType } from "../../models/booking/BookingType";

@JsonController("/bookings")
@Service()
export class AdminCategoriesController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async create(
    @Body() request: BookingRequestDto
  ) {
    console.log("dddddddddd");
    const booking = await this.bookingService.create(request);
    return new Booking(booking);
  }

  @Get()
  public async findById(@Param("bookingId") bookingId: string) {
    const booking = await this.bookingService.findById(bookingId);
    return new Booking(booking);
  }

  @Get("/filterBookings")
  public async filterBookings(@Param("dateOfBooking") dateOfBooking: Date, @Param("startTime") startTime: number, @Param("endTime") endTime?: number ) {
    return this.bookingService.filterBookings(dateOfBooking,startTime,endTime);
  }

  @Get("/filterwithBookingType")
  public async filterwithBookingType(@Param("dateOfBooking") dateOfBooking: Date,@Param("bookingType") bookingType: BookingType, @Param("startTime") startTime: number, @Param("endTime") endTime?: number ) {
    return this.bookingService.filterwithBookingType(dateOfBooking,bookingType,startTime,endTime);
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
