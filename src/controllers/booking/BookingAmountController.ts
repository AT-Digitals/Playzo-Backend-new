import { Body, JsonController, Param, Put } from "routing-controllers";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";
import { BookingAmountRequestDto } from "../../dto/Booking/BookingAmountRequestDto";
import { BookingDto } from "../../dto/Booking/BookingDto";

@JsonController("/admin/bookingAmount")
@Service()
export class BookingAmountController {
  constructor(private bookingService: BookingService) {}

  @Put("/:bookingId")
  public async updateById(
    @Param("bookingId") bookingId: string,
    @Body() newPrice: BookingAmountRequestDto
  ) {
    console.log(":cvnfd")
    const booking = await this.bookingService.updateAmount(bookingId, newPrice);
    return new BookingDto(booking);
  }
}
