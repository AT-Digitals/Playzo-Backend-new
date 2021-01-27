import { Body, Get, JsonController, Post } from "routing-controllers";
import { AdminPropertyDeveloperRequestDto } from "../../../dto/admin/propertyDeveloper/AdminPropertyDeveloperRequestDto";
import { AdminPropertyDeveloperService } from "../../../services/admin/propertyDeveloper/AdminPropertyDeveloperServices";
import { IsAdmin } from "../../../middleware/AuthValidator";

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
}
