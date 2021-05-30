import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import {
  UploadUtils,
  UploadedFiles,
  UploadedImages,
} from "../../../utils/UploadUtil";
import { AdminHomePageServices } from "../../../services/admin/homePage/HomePageServices";
import { HomePageCarouselOrderUpdateRequestDto } from "../../../dto/admin/homePage/HomePageCarouselRequestDto";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/homePage/carousel")
export class AdminHomePageCarouselController {
  constructor(private AdminHomePageService: AdminHomePageServices) {}

  @IsAdmin()
  @Post("/images")
  public async addImages(@UploadedImages("medias") desktopFile: UploadedFiles) {
    const imageList = UploadUtils.getUploadedUrls(desktopFile);

    return this.AdminHomePageService.addImages(imageList);
  }

  @IsAdmin()
  @Get("/images")
  public async getAllImagesFromAdmin() {
    return this.AdminHomePageService.getAllImages();
  }

  @IsAdmin()
  @Put("/images/changeOrder")
  public async changeCarouselOrder(
    @Body() updateDto: HomePageCarouselOrderUpdateRequestDto
  ) {
    return this.AdminHomePageService.changeOrder(updateDto);
  }

  @IsAdmin()
  @Delete("/images/:imageId")
  public async deleteCarouselImage(@Param("imageId") imageId: string) {
    return this.AdminHomePageService.deleteImage(imageId);
  }
}
