import { Delete, Get, JsonController, Param, Post } from "routing-controllers";
import {
  UploadUtils,
  UploadedFiles,
  UploadedImages,
} from "../../../utils/UploadUtil";

import { AdminHomePageServices } from "../../../services/admin/homePage/HomePageServices";
import { HomePageCarouselModel } from "../../../models/homePage/HomePageCarouselModel";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/homePage/carousel")
export class AdminHomePageCarouselController {
  constructor(private AdminHomePageService: AdminHomePageServices) {}

  @IsAdmin()
  @Post("/images")
  public async addImages(@UploadedImages("medias") desktopFile: UploadedFiles) {
    const imageList = UploadUtils.getUploadedUrls(desktopFile);

    const mediaList = imageList.map(
      (url) => ({ url } as HomePageCarouselModel)
    );

    return this.AdminHomePageService.addImages(mediaList);
  }

  @IsAdmin()
  @Get("/images")
  public async getAllImagesFromAdmin() {
    return this.AdminHomePageService.getAllImages();
  }

  @IsAdmin()
  @Delete("/images/:imageId")
  public async deleteCarouselImage(@Param("imageId") imageId: string) {
    return this.AdminHomePageService.deleteImage(imageId);
  }
}
