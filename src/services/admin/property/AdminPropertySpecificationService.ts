import { PropertySpecificationModal, PropertySpecificationValueType } from "../../../models/property/PropertySpecificationModal";

import { AdminPropertiesOverviewService } from "./AdminPropertiesOverviewService";
import { AdminPropertyDetailedDto } from "../../../dto/admin/property/AdminPropertyDetailedDto";
import {PropertySpecifictionDto} from "../../../dto/admin/property/PropertySpecificationDto";
import { Service } from "typedi";

@Service()
export class AdminPropertySpecificationService {
    constructor(
        private AdminPropertyOverviewService: AdminPropertiesOverviewService
    ) { }

    public async setSpecification(propertyId: string, category: keyof PropertySpecificationModal, data: PropertySpecifictionDto[]) {
        let property = await this.AdminPropertyOverviewService.findByPropertyId(propertyId);

        if (property.specifications) {
            property.specifications[category] = data.map(d => d as PropertySpecificationValueType);
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
            property.specifications[category] = data.map(d => d as PropertySpecificationValueType);
        }

        await property.save();
        property = await property.populate("category").execPopulate();

        return new AdminPropertyDetailedDto(property);
    }

    public async removeSpecification(propertyId: string, category: keyof PropertySpecificationModal, id: string) {
        let property = await this.AdminPropertyOverviewService.findByPropertyId(propertyId);

        property.specifications[category] = property.specifications[category].filter((ele: PropertySpecificationValueType) => ele.id !== id);

        await property.save();
        property = await property.populate("category").execPopulate();

        return new AdminPropertyDetailedDto(property);
    }
}