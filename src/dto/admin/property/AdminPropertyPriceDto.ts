import { PropertyPriceModal } from "../../../models/property/PropertyPriceModel";

export class AdminPropertyPriceDto {
  from: number;
  to: number;
  perSqFt: number;
  constructor(price: PropertyPriceModal) {
    this.from = price.from;
    this.to = price.to;
    this.perSqFt = price.perSqFt;
  }
}
