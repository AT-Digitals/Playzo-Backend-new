import { Body, JsonController, Param, Post } from "routing-controllers";
import { AdminPropertyAddSpecificationDto } from "../../../dto/admin/property/AdminPropertySpecificationRequestDto";
import { AdminPropertySpecificationService } from "../../../services/admin/property/AdminPropertySpecificationService";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/properties/:propertyId/specification")
export class AdminPropertySpecificationController {
  constructor(
    private adminPropertiesAmenitiesService: AdminPropertySpecificationService
  ) {}

  @IsAdmin()
  @Post("/")
  public async addSpecification(
    @Body() req: AdminPropertyAddSpecificationDto,
    @Param("propertyId") propertyId: string
  ) {
    return this.adminPropertiesAmenitiesService.setSpecification(
      propertyId,
      req.category,
      req.data
    );
  }
}
