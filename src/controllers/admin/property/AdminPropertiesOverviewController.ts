import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { AdminPropertiesOverviewService } from "../../../services/admin/property/AdminPropertiesOverviewService";
import { AdminPropertyOverviewRequestDto } from "../../../dto/admin/property/AdminPropertyOverviewRequestDto";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { Service } from "typedi";

@JsonController("/admins/properties")
@Service()
export class AdminPropertiesOverviewController {
  constructor(
    private adminPropertiesOverviewService: AdminPropertiesOverviewService
  ) {}

  @IsAdmin()
  @Get("/")
  public async getAllProperties() {
    return this.adminPropertiesOverviewService.getAllProperties();
  }

  @IsAdmin()
  @Post("/")
  public async addNewProperty(
    @Body() propertyRequest: AdminPropertyOverviewRequestDto
  ) {
    return this.adminPropertiesOverviewService.addNewProperty(propertyRequest);
  }

  @IsAdmin()
  @Get("/:propertyId")
  public async getPropertyDetails(@Param("propertyId") propertyId: string) {
    return this.adminPropertiesOverviewService.getPropertyDetails(propertyId);
  }

  @IsAdmin()
  @Put("/:propertyId")
  public async updatePropertyOverview(
    @Param("propertyId") propertyId: string,
    @Body() propertyRequest: AdminPropertyOverviewRequestDto
  ) {
    return this.adminPropertiesOverviewService.updatePropertyOverview(
      propertyId,
      propertyRequest
    );
  }
}
