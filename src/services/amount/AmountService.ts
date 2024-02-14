import { Amount } from "../../models/amount/Amount";
import { AmountDto } from "../../dto/amount/AmountDto";
import { AmountRequestDto } from "../../dto/amount/AmountRequestDto";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Service } from "typedi";

@Service()
export default class AmountService {

  async create(request: AmountRequestDto) {
   
        let amount = new Amount(request);

        amount = await amount.save();
    
        return amount;
  }

  async findById(id: string) {
    const amount = await Amount.findOne({_id:id});
    if (!amount) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    return amount;

  }

  async findByAmount(type: any) {
    console.log("type", type);
    const amount = await Amount.find({bookingtype:type});
    if (!amount[0]) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    amount[0].bookingAmount = amount[0].bookingAmount*(30/100);
    // totalAmount * (30/100)
    return amount[0];

  }

  public async getAll() {
    
    const amounts = await Amount.find({}).populate("user","name email phone userType").exec();
    return amounts.map((amount) => new AmountDto(amount));
  }

  async updateById(id: string, request: AmountRequestDto) {
    let amount = await this.findById(id);
    if (!amount) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    amount.bookingAmount = request.bookingAmount;
    amount.bookingtype = request.bookingtype;
    amount.court = request.court;
    amount.deleted = false;
    amount = await amount.save();
    return amount;
  }

  async deleteById(id: string) {
    let amount = await this.findById(id);
    if (!amount) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    amount.deleted = true;
    amount = await amount.save();
    return amount;
  }
}
