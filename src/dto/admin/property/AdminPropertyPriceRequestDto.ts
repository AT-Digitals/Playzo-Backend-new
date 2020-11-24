import { Allow, IsDefined } from "class-validator";

export class AdminPropertyPriceRequestDto {
  @IsDefined({ message: "From price is required" })
  from: number;

  @Allow()
  to: number;

  @Allow()
  perSqFt: number;
}
