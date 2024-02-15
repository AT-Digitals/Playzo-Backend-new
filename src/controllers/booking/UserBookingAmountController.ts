import { Get, JsonController, Param } from "routing-controllers";
import { AmountDto } from "../../dto/amount/AmountDto";
import AmountService from "../../services/amount/AmountService";
import { Service } from "typedi";

@JsonController("/user/booking/amount")
@Service()
export class UserBookingController {
  constructor(private amountService: AmountService) {}

  @Get("/:type")
  public async getAmount(@Param("type") type: string) {
    const amount = await this.amountService.findByAmount(type);
    return new AmountDto(amount);
  }

}
