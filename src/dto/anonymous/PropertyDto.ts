import { CategoryModel } from "../../models/category/CategoryModel";
import { PropertyDeveloperDto } from "./PropertyDeveloperDto";
import { PropertyMediaDto } from "./PropertyMediaDto";
import { PropertyModel } from "../../models/property/PropertyModel";
import { PropertySpecifictionDto } from "./PropertySpecificationDto";
export class PropertyDto {
  id: string;
  name: string;
  city: string;
  subLocation: string;
  reraNumber: string;
  price: { from: number; to: number; perSqFt: number };
  category: string;
  possessionDate: Date;
  numberOfUnits: number;
  usps: string[];
  amenities: string[];
  specification: {
    Flooring: PropertySpecifictionDto[];
    Windows: PropertySpecifictionDto[];
    Bathroom: PropertySpecifictionDto[];
    Kitchen: PropertySpecifictionDto[];
    Electrical: PropertySpecifictionDto[];
    Fittings: PropertySpecifictionDto[];
    Others: PropertySpecifictionDto[];
  };
  media: PropertyMediaDto[];
  propertyDeveloper: PropertyDeveloperDto;
  paymentTranches: string;
  constructor(property: PropertyModel) {
    this.id = property.id;
    this.name = property.name;
    this.city = property.city;
    this.subLocation = property.subLocation;
    this.reraNumber = property.reraNumber;
    this.numberOfUnits = property.numberOfUnits;
    this.usps = property.usps.map((usp) => usp);
    this.amenities = property.amenities.map((amenity) => amenity);
    if (property.specifications) {
      this.specification = {
        Flooring: property.specifications.Flooring.map(
          (val) => new PropertySpecifictionDto(val)
        ),
        Windows: property.specifications.Windows.map(
          (val) => new PropertySpecifictionDto(val)
        ),
        Fittings: property.specifications.Fittings.map(
          (val) => new PropertySpecifictionDto(val)
        ),
        Electrical: property.specifications.Electrical.map(
          (val) => new PropertySpecifictionDto(val)
        ),
        Bathroom: property.specifications.Bathroom.map(
          (val) => new PropertySpecifictionDto(val)
        ),
        Kitchen: property.specifications.Kitchen.map(
          (val) => new PropertySpecifictionDto(val)
        ),
        Others: property.specifications.Others.map(
          (val) => new PropertySpecifictionDto(val)
        ),
      };
    }
    this.price = {
      from: property.price.from,
      to: property.price.to,
      perSqFt: property.price.perSqFt,
    };
    this.category = property.categories
      .map((category: CategoryModel) => category.displayName)
      .join(", ");
    this.possessionDate = property.possessionBy;
    this.media = property.media.map((mm) => new PropertyMediaDto(mm));
    if (property.propertyDeveloper) {
      this.propertyDeveloper = new PropertyDeveloperDto(
        property.propertyDeveloper
      );
    }
    this.paymentTranches = property.paymentTranches;
  }
}
