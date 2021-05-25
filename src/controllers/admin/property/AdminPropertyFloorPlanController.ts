import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
} from "routing-controllers";
import {
  UploadUtils,
  UploadedFile,
  UploadedImage,
} from "../../../utils/UploadUtil";
import { AdminPropertyFloorPlanRequestDto } from "../../../dto/admin/property/AdminPropertyFloorPlanRequetDto";
import { AdminPropertyFloorPlanService } from "../../../services/admin/property/AdminPropertyFloorPlanServices";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/propertyFloorPlan")
export class AdminPropertyFloorPlanController {
  constructor(private adminFloorPlanService: AdminPropertyFloorPlanService) {}

  @IsAdmin()
  @Get("/:propertyId/:category/:variation")
  public async getFloorPlan(
    @Param("propertyId") propertyId: string,
    @Param("category") category: string,
    @Param("variation") variation: string
  ) {
    return this.adminFloorPlanService.getPropertyFloorPlan(
      propertyId,
      category,
      variation
    );
  }

  @IsAdmin()
  @Get("/:propertyId/:category")
  public async getFloorPlanOnlyWithCategory(
    @Param("propertyId") propertyId: string,
    @Param("category") category: string
  ) {
    return this.adminFloorPlanService.getPropertyFloorPlan(
      propertyId,
      category,
      "",
      true
    );
  }

  @IsAdmin()
  @Post("/")
  public async addFloorPlan(
    @Body() floorPlanRequestDto: AdminPropertyFloorPlanRequestDto
  ) {
    return this.adminFloorPlanService.addPropertyFloorPlan(floorPlanRequestDto);
  }

  @IsAdmin()
  @Post("/image/:propertyId/:floorPlanId/:category/:variation")
  public async addImages(
    @UploadedImage("medias") desktopFile: UploadedFile,
    @Param("propertyId") propertyId: string,
    @Param("floorPlanId") floorPlanId: string,
    @Param("category") category: string,
    @Param("variation") variation: string
  ) {
    const image = UploadUtils.getUploadedUrl(desktopFile);

    if (image) {
      return this.adminFloorPlanService.addFloorPlanImage(
        propertyId,
        floorPlanId,
        category,
        variation,
        image
      );
    }
  }

  @IsAdmin()
  @Delete("/:propertyId/:floorPlanId/:category/:variation")
  public async deleteFloorPlan(
    @Param("propertyId") propertyId: string,
    @Param("floorPlanId") floorPlanId: string,
    @Param("category") category: string,
    @Param("variation") variation: string
  ) {
    return this.adminFloorPlanService.deletePropertyFloorPlan(
      propertyId,
      floorPlanId,
      category,
      variation
    );
  }
}
