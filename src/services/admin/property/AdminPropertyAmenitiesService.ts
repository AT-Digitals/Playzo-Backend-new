import { AdminPropertiesOverviewService } from "./AdminPropertiesOverviewService";
import { AdminPropertyAmenitiesRequestDto } from "../../../dto/admin/property/AdminPropertyAmenitiesRequestDto";
import { AdminPropertyDetailedDto } from "../../../dto/admin/property/AdminPropertyDetailedDto";
import { Service } from "typedi";

@Service()
export class AdminPropertiesAmenitiesService {
    constructor(
        private AdminPropertyOverviewService: AdminPropertiesOverviewService
    ) {

    }
    public async updateAmenities(amenities: AdminPropertyAmenitiesRequestDto, propertyId: string) {
        let property = await this.AdminPropertyOverviewService.findByPropertyId(propertyId);
        property.amenities = amenities.amenities;
        await property.save();
        property = await property.populate("category").execPopulate();

        return new AdminPropertyDetailedDto(property);
    }
}