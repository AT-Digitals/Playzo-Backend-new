import { AdminPropertyOverviewDto } from "./AdminPropertyOverviewDto";
import { PropertyModel } from "../../../models/property/PropertyModel";

export class AdminPropertyDetailedDto {
  id: string;
  overview: AdminPropertyOverviewDto;

  constructor(property: PropertyModel) {
    this.id = property.id;
    this.overview = new AdminPropertyOverviewDto(property);
  }
}
