import { Body, JsonController, Param, Post } from "routing-controllers";

import { AdminPropertiesLocationService } from "../../../services/admin/property/AdminPropertyLocationServices";
import { AdminPropertyLocationRequestDto } from "../../../dto/admin/property/AdminPropertyLocationRequestDto";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/properties/:propertyId/location")
export class AdminPropertyLocationController {
  constructor(
    private adminPropertiesLocationService: AdminPropertiesLocationService
  ) {}

  @IsAdmin()
  @Post("/")
  public async addLocation(
    @Body() locationRequestDto: AdminPropertyLocationRequestDto,
    @Param("propertyId") propertyId: string
  ) {
    return this.adminPropertiesLocationService.addLocation(
      locationRequestDto,
      propertyId
    );
  }
}