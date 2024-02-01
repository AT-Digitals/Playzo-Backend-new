import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";

import { Service } from "typedi";
import AmountService from "../../services/amount/AmountService";
import { AmountRequestDto } from "../../dto/amount/AmountRequestDto";
import { AmountDto } from "../../dto/amount/AmountDto";

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
    console.log("amount")
    const amount = await this.amountService.updateById(amountId, newPrice);
    return new AmountDto(amount);
  }

  @Delete()
  public async deleteById(@Param("amountId") amountId: string) {
    const amount = await this.amountService.deleteById(amountId);
    return new AmountDto(amount);
  }
}
