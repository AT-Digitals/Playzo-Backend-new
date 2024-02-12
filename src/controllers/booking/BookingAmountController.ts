import { Body, JsonController, Param, Put } from "routing-controllers";
import { BookingAmountRequestDto } from "../../dto/booking/BookingAmountRequestDto";
import { BookingDto } from "../../dto/booking/BookingDto";
import BookingService from "../../services/booking/BookingService";
import { Service } from "typedi";

@JsonController("/admin/bookingAmount")
@Service()
export class BookingAmountController {
  constructor(private bookingService: BookingService) {}

  @Put("/:bookingId")
  public async updateById(
    @Param("bookingId") bookingId: string,
    @Body() newPrice: BookingAmountRequestDto
  ) {
    const booking = await this.bookingService.updateAmount(bookingId, newPrice);
    return new BookingDto(booking);
  }
}
