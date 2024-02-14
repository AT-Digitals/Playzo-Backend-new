import { Get, JsonController, Param } from "routing-controllers";
import { Service } from "typedi";
import AmountService from "../../services/amount/AmountService";
import { AmountDto } from "../../dto/amount/AmountDto";

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


