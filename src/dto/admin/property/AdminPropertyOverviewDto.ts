import { AdminCategoryDto } from "../category/AdminCategoryDto";
import { AdminPropertyPriceDto } from "./AdminPropertyPriceDto";
import { AdminPropertyMediaDto } from "./AdminPropertyMediaDto"
import { PropertyModel } from "../../../models/property/PropertyModel";

export class AdminPropertyOverviewDto {
  id: string;
  name: string;
  city: string;
  subLocation: string;
  reraNumber: string;
  possessionBy: Date | null;
  category: AdminCategoryDto;
  numberOfUnits: number;
  usps: string[];
  price: AdminPropertyPriceDto;
  media: AdminPropertyMediaDto[];

  constructor(property: PropertyModel) {
    this.id = property.id;
    this.name = property.name;
    this.city = property.city;
    this.subLocation = property.subLocation;
    this.reraNumber = property.reraNumber;
    this.price = new AdminPropertyPriceDto(property.price);
    this.possessionBy = property.possessionBy
      ? new Date(property.possessionBy)
      : null;
    this.numberOfUnits = property.numberOfUnits;
    this.usps = property.usps;
    this.category = new AdminCategoryDto(property.category);
    this.media = property?.media.map(ele => new AdminPropertyMediaDto(ele))

  }

}
