import { AdminPropertiesOverviewService } from "./AdminPropertiesOverviewService";
import { AdminPropertyDetailedDto } from "../../../dto/admin/property/AdminPropertyDetailedDto";
import { AdminPropertyLocationRequestDto } from "../../../dto/admin/property/AdminPropertyLocationRequestDto";
import { PropertyLocationModel } from "../../../models/property/PropertyLocationModel";
import { Service } from "typedi";

@Service()
export class AdminPropertiesLocationService {
  constructor(
    private AdminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}

  public async addLocation(
    locationRequest: AdminPropertyLocationRequestDto,
    propertyId: string
  ) {
    let property = await this.AdminPropertyOverviewService.findByPropertyId(
      propertyId
    );
    property.location = locationRequest as PropertyLocationModel;
    property = await property.save();

    return new AdminPropertyDetailedDto(property);
  }
}
