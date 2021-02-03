/* eslint-disable sort-imports */
import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { AdminPropertyDeveloperRequestDto } from "../../../dto/admin/propertyDeveloper/AdminPropertyDeveloperRequestDto";
import { AdminPropertyDeveloperService } from "../../../services/admin/propertyDeveloper/AdminPropertyDeveloperServices";
import { IsAdmin } from "../../../middleware/AuthValidator";
import {
  UploadUtils,
  UploadedFile,
  UploadedImage,
} from "../../../utils/UploadUtil";

@JsonController("/admins/propertyDeveloper")
export class AdminPropertiesOverviewController {
  constructor(
    private adminPropertyDeveloperService: AdminPropertyDeveloperService
  ) {}

  @IsAdmin()
  @Get("/")
  public async getAllPropertyDevelopers() {
    return this.adminPropertyDeveloperService.getAllPropertyDevelopers();
  }

  @IsAdmin()
  @Get("/:propertyDeveloperId")
  public async getPropertyDeveloper(
    @Param("propertyDeveloperId") propertyDeveloperId: string
  ) {
    return this.adminPropertyDeveloperService.getPropertyDeveloper(
      propertyDeveloperId
    );
  }

  @IsAdmin()
  @Put("/:propertyDeveloperId")
  public async updatePropertyDeveloper(
    @Param("propertyDeveloperId") propertyDeveloperId: string,
    @Body() updatedPropertyDeveloperRequest: AdminPropertyDeveloperRequestDto
  ) {
    return this.adminPropertyDeveloperService.updatePropertyDeveloper(
      propertyDeveloperId,
      updatedPropertyDeveloperRequest
    );
  }

  @IsAdmin()
  @Get("/:propertyDeveloperId/image")
  public async getImage(
    @Param("propertyDeveloperId") propertyDeveloperId: string
  ) {
    return this.adminPropertyDeveloperService.getImage(propertyDeveloperId);
  }

  @IsAdmin()
  @Post("/:propertyDeveloperId/image")
  public async addImage(
    @UploadedImage("medias") desktopFile: UploadedFile,
    @Param("propertyDeveloperId") propertyDeveloperId: string
  ) {
    const image = UploadUtils.getUploadedUrl(desktopFile);

    if (image) {
      return this.adminPropertyDeveloperService.addImage(
        propertyDeveloperId,
        image
      );
    }
  }

  @IsAdmin()
  @Post("/")
  public async addNewPropertyDeveloper(
    @Body() propertyDeveloperRequest: AdminPropertyDeveloperRequestDto
  ) {
    return this.adminPropertyDeveloperService.addNewPropertyDeveloper(
      propertyDeveloperRequest
    );
  }
}
