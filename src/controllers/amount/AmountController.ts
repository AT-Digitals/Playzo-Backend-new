import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { Amount } from "../../models/amount/Amount";
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
    const amount =  this.amountService.findById(amountId);
    return new Amount(amount);
  }

  @Get()
  public async getAllBookings() {
     const bookings = this.amountService.getAll();
     return bookings;
  }

  @Put()
  public async updateById(
    @Param("amountId") amountId: string,
    @Body() newPrice: AmountRequestDto
  ) {
    const amount = await this.amountService.updateById(amountId, newPrice);
    return new Amount(amount);
  }

  @Delete()
  public async deleteById(@Param("amountId") amountId: string) {
    const amount = await this.amountService.deleteById(amountId);
    return new Amount(amount);
  }
}
