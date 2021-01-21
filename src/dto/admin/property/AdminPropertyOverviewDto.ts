import { AdminCategoryDto } from "../category/AdminCategoryDto";
import { AdminPropertyPriceDto } from "./AdminPropertyPriceDto";
import { CategoryModel } from "../../../models/category/CategoryModel";
import { PropertyModel } from "../../../models/property/PropertyModel";

export class AdminPropertyOverviewDto {
  id: string;
  name: string;
  city: string;
  subLocation: string;
  reraNumber: string;
  possessionBy: Date | null;
  categories: AdminCategoryDto[];
  numberOfUnits: number;
  usps: string[];
  price: AdminPropertyPriceDto;

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
    this.categories = property.categories.map(
      (category: CategoryModel) => new AdminCategoryDto(category)
    );
  }
}
