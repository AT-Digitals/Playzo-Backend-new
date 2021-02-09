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
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { AppError } from "../../../dto/error/AppError";

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
  @Post("/")
  public async addNewPropertyDeveloper(
    @Body() propertyDeveloperRequest: AdminPropertyDeveloperRequestDto
  ) {
    return this.adminPropertyDeveloperService.addNewPropertyDeveloper(
      propertyDeveloperRequest
    );
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
  @Put("/:propertyDeveloperId/image")
  public async updateImage(
    @UploadedImage("medias") imageFile: UploadedFile,
    @Param("propertyDeveloperId") propertyDeveloperId: string
  ) {
    const image = UploadUtils.getUploadedUrl(imageFile);

    if (image) {
      return this.adminPropertyDeveloperService.updateImage(
        propertyDeveloperId,
        image
      );
    } else {
      throw new AppErrorDto(AppError.INPUT_PARAM_ERROR);
    }
  }
}
