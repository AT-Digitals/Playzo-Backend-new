import { Mediatype } from "../../models/property/PropertyMediaModel";
import { PropertyModel } from "../../models/property/PropertyModel";

export class PropertyDto {
  name: string;
  city: string;
  price: { from: number; to: number; perSqFt: number };
  category: string;
  possessionDate: Date;
  images: string[];
  constructor(property: PropertyModel) {
    this.name = property.name;
    this.city = property.city;
    this.price = {
      from: property.price.from,
      to: property.price.to,
      perSqFt: property.price.perSqFt,
    };
    this.category = property.category.displayName;
    this.possessionDate = property.possessionBy;
    this.images = property.media
      .filter((m) => m.type === Mediatype.image)
      .map((m) => m.url);
  }
}
