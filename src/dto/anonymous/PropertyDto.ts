import { CategoryModel } from "../../models/category/CategoryModel";
import { Mediatype } from "../../models/property/PropertyMediaModel";
import { PropertyDeveloperDto } from "./PropertyDeveloperDto";
import { PropertyModel } from "../../models/property/PropertyModel";
import { PropertySpecifictionDto } from "./PropertySpecificationDto";
import { elemT } from "../../utils/UnionArray";
export class PropertyDto {
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
  images: string[];
  propertyDeveloper: PropertyDeveloperDto;
  constructor(property: PropertyModel) {
    this.name = property.name;
    this.city = property.city;
    this.subLocation = property.subLocation;
    this.reraNumber = property.reraNumber;
    this.numberOfUnits = property.numberOfUnits;
    this.usps = property.usps.map((usp) => usp);
    this.amenities = property.amenities.map((amenity) => amenity);
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
    this.price = {
      from: property.price.from,
      to: property.price.to,
      perSqFt: property.price.perSqFt,
    };
    this.category = elemT(property.categories)
      .map((category: CategoryModel) => category.displayName)
      .join(",");
    this.possessionDate = property.possessionBy;
    this.images = property.media
      .filter((m) => m.type === Mediatype.image)
      .map((m) => m.url);
    this.propertyDeveloper = new PropertyDeveloperDto(
      property.propertyDeveloper
    );
  }
}
