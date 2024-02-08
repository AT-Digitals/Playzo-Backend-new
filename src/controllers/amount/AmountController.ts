import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { AmountDto } from "../../dto/amount/AmountDto";
import { AmountRequestDto } from "../../dto/amount/AmountRequestDto";
import AmountService from "../../services/amount/AmountService";
import { Service } from "typedi";

@JsonController("/admin/amount")
@Service()
export class AmountController {
  constructor(private amountService: AmountService) {}

  @Post()
  async create(
    @Body() request: AmountRequestDto
  ) {
    const amount = await this.amountService.create(request);
    return new AmountDto(amount);
  }

  @Get("/:amountId")
  public async findById(@Param("amountId") amountId: string) {
    const amount =  await this.amountService.findById(amountId);
    return new AmountDto(amount);
  }

  @Get()
  public async getAllAmounts() {
     const amounts = this.amountService.getAll();
     return amounts;
  }

  @Put("/:amountId")
  public async updateById(
    @Param("amountId") amountId: string,
    @Body() newPrice: AmountRequestDto
  ) {
    const amount = await this.amountService.updateById(amountId, newPrice);
    return new AmountDto(amount);
  }

  @Delete()
  public async deleteById(@Param("amountId") amountId: string) {
    const amount = await this.amountService.deleteById(amountId);
    return new AmountDto(amount);
  }
}
