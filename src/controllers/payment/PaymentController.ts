import { Body,  JsonController,  Post } from "routing-controllers";
import { Service } from "typedi";
// eslint-disable-next-line sort-imports
import { PaymentRequestDto } from "../../dto/payment/PaymentRequestDto";
import PaymentService from "../../services/payment/PaymentService";
import { VerifyRequestDto } from "../../dto/payment/VerifyRequestDto";

@JsonController("/payments")
@Service()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post("/orders")
  async create(
    @Body() request: PaymentRequestDto
  ) {
    const payment = await this.paymentService.create(request);
    return payment;
  }

  @Post("/create/orderId")
  async createOrder(
    @Body() request: PaymentRequestDto
  ) {
    const payment = await this.paymentService.createOrder(request);
    console.log("orders",payment);
return payment;
    
  }

  @Post("/verify")
  async verifyPayment(
    @Body() req: VerifyRequestDto
  ) {
    const payment = await this.paymentService.verifyPayment(req);
    return payment;
  }

  @Post("/refund")
  async refundPayment(
    @Body() req: any
  ) {
    const payment = await this.paymentService.refundPayment(req);
    return payment;
  }
}
