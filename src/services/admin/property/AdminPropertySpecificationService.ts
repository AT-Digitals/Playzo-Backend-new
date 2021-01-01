import {
  PropertySpecificationModal,
  PropertySpecificationValueType,
} from "../../../models/property/PropertySpecificationModal";

import { AdminPropertiesOverviewService } from "./AdminPropertiesOverviewService";
import { AdminPropertyDetailedDto } from "../../../dto/admin/property/AdminPropertyDetailedDto";
import { PropertySpecifictionDto } from "../../../dto/admin/property/PropertySpecificationDto";
import { Service } from "typedi";

@Service()
export class AdminPropertySpecificationService {
  constructor(
    private AdminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}

  public async setSpecification(
    propertyId: string,
    category: keyof PropertySpecificationModal,
    data: PropertySpecifictionDto[]
  ) {
    let property = await this.AdminPropertyOverviewService.findByPropertyId(
      propertyId
    );

    if (property.specifications) {
      property.specifications[category] = data.map(
        (d) => d as PropertySpecificationValueType
      );
    } else {
      property.specifications = {
        Bathroom: [],
        Electrical: [],
        Fittings: [],
        Flooring: [],
        Kitchen: [],
        Windows: [],
        Others: [],
      };
      property.specifications[category] = data.map(
        (d) => d as PropertySpecificationValueType
      );
    }

    await property.save();
    property = await property.populate("category").execPopulate();

    return new AdminPropertyDetailedDto(property);
  }
}
