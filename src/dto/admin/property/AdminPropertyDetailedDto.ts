import { AdminPropertyOverviewDto } from "./AdminPropertyOverviewDto";
import { PropertyModel } from "../../../models/property/PropertyModel";
import { AdminPropertyMediaDto } from "./AdminPropertyMediaDto"
export class AdminPropertyDetailedDto {
  id: string;
  overview: AdminPropertyOverviewDto;
  media: AdminPropertyMediaDto[];
  amenities: string[]

  constructor(property: PropertyModel) {
    this.id = property.id;
    this.overview = new AdminPropertyOverviewDto(property);
    this.media = property?.media.map(ele => new AdminPropertyMediaDto(ele))
    this.amenities = property?.amenities
  }
}
