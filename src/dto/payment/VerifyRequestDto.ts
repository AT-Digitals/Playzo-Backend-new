import { IsDefined } from "class-validator";

export class VerifyRequestDto {
    @IsDefined({ message: "OrderId is required" })
    orderId: string;
    @IsDefined({ message: "paymentId is required" })
    paymentId: string;
    @IsDefined({ message: "signature is required" })
    signature: string;

}
