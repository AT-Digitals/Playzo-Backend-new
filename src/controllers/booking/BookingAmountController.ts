import { Body, JsonController, Param, Put } from "routing-controllers";
import { Booking } from "../../models/booking/Booking";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
import { BookingAmountRequestDto } from "../../dto/Booking/BookingAmountRequestDto";

@JsonController("/admin/bookingAmount")
@Service()
export class BookingAmountController {
  constructor(private bookingService: BookingService) {}

  @Put()
  public async updateById(
    @Param("bookingId") bookingId: string,
    @Body() newPrice: BookingAmountRequestDto
  ) {
    const booking = await this.bookingService.updateAmount(bookingId, newPrice);
    return new Booking(booking);
  }
}
