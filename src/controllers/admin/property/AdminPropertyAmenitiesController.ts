import { Body, JsonController, Param, Post } from "routing-controllers";
import { AdminPropertiesAmenitiesService } from "../../../services/admin/property/AdminPropertyAmenitiesService";
import { AdminPropertyAmenitiesRequestDto } from "../../../dto/admin/property/AdminPropertyAmenitiesRequestDto";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { Service } from "typedi";

@JsonController("/admins/properties/:propertyId/amenities")
@Service()
export class AdminPropertyAmenitiesController {
  constructor(
    private adminPropertiesAmenitiesService: AdminPropertiesAmenitiesService
  ) {}

  @IsAdmin()
  @Post("/")
  public async updateAmenities(
    @Body() amenities: AdminPropertyAmenitiesRequestDto,
    @Param("propertyId") propertyId: string
  ) {
    return this.adminPropertiesAmenitiesService.updateAmenities(
      amenities,
      propertyId
    );
  }
}
