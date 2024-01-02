import { IsDefined } from "class-validator";

export class PaymentRequestDto {
    @IsDefined({ message: "Amount is required" })
    amount: number;

}
