import { Delete, Get, JsonController, Param, Post } from "routing-controllers";
import {
  UploadUtils,
  UploadedFiles,
  UploadedImages,
} from "../../../utils/UploadUtil";

import { AdminHomePageServices } from "../../../services/admin/homePage/HomePageServices";
import { HomePageCarouselModel } from "../../../models/homePage/HomePageCarouselModel";
import { HomePageCarouselMediamodel } from "../../../models/homePage/HomePageCarouselMediaModel";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/homePage/media")
export class AdminHomePageController {
  constructor(private AdminHomePageService: AdminHomePageServices) {}

  @IsAdmin()
  @Post("/images")
  public async addImages(@UploadedImages("medias") desktopFile: UploadedFiles) {
    const imageList = UploadUtils.getUploadedUrls(desktopFile);

    const mediaList = imageList.map(
      (url) => ({ url } as HomePageCarouselMediamodel)
    );

    const image = {
      image: mediaList,
    } as HomePageCarouselModel;

    return this.AdminHomePageService.addImages(image);
  }

  @IsAdmin()
  @Get("/images")
  public async getAllImagesFromAdmin() {
    return this.AdminHomePageService.getAllImages();
  }

  @Get("/images/user")
  public async getAllImages() {
    return this.AdminHomePageService.getAllImages();
  }
}
