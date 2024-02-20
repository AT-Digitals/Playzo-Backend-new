import { Get, JsonController, Param } from "routing-controllers";
import { AmountDto } from "../../dto/amount/AmountDto";
import AmountService from "../../services/amount/AmountService";
import { Service } from "typedi";

@JsonController("/user/booking/amount")
@Service()
export class UserBookingController {
  constructor(private amountService: AmountService) {}

  @Get("/:type/:court")
  public async getAmount(@Param("type") type: string, @Param("court") court: number) {
    const amount = await this.amountService.findByAmount(type, court);
    return new AmountDto(amount);
  }

}
