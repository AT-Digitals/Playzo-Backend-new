import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put
} from "routing-controllers";
import { AdminPropertiesOverviewService } from "../../../services/admin/property/AdminPropertiesOverviewService";
import { AdminPropertyOverviewRequestDto } from "../../../dto/admin/property/AdminPropertyOverviewRequestDto";
import { AdminPropertyMediaDto } from "../../../dto/admin/property/AdminPropertyMediaDto";
import { Mediatype } from "../../../models/property/PropertyMediaModel";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { UploadUtils, UploadedFiles, UploadedImages } from "../../../utils/UploadUtil";

@JsonController("/admins/properties")
export class AdminPropertiesOverviewController {
  constructor(
    private adminPropertiesOverviewService: AdminPropertiesOverviewService
  ) { }

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
  @Post("/images")
  public async addImages(
    @Body() req: AdminPropertyMediaDto,
    @UploadedImages("desktopImage") desktopFile: UploadedFiles
  ) {

    const desktopImage = UploadUtils.getUploadedUrls(desktopFile);
    return this.adminPropertiesOverviewService.addNewImages(req, {
      url: desktopImage,
      type: Mediatype.image
    });
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
