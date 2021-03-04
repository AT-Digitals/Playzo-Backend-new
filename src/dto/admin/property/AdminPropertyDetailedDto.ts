import { AdminPropertyMediaDto } from "./AdminPropertyMediaDto";
import { AdminPropertyOverviewDto } from "./AdminPropertyOverviewDto";
import { AdminPropertySpecificationDto } from "./AdminPropertySpecificationDto";
import { PropertyModel } from "../../../models/property/PropertyModel";
export class AdminPropertyDetailedDto {
  id: string;
  overview: AdminPropertyOverviewDto;
  media: AdminPropertyMediaDto[];
  amenities: string[];
  specifications: AdminPropertySpecificationDto;
  paymentTranches: string;

  constructor(property: PropertyModel) {
    this.id = property.id;
    this.overview = new AdminPropertyOverviewDto(property);
    this.media = property?.media.map((ele) => new AdminPropertyMediaDto(ele));
    this.amenities = property?.amenities;
    this.specifications = new AdminPropertySpecificationDto(
      property.specifications
    );
    this.paymentTranches = property.paymentTranches;
  }
}
