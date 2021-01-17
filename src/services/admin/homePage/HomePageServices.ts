import { AdminError } from "../../../dto/error/AdminError";
import { AdminHomePageCarouselDto } from "../../../dto/admin/homePage/HomePageCarouselDto";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { HomePageCarousel } from "../../../models/homePage/HomePageCarouselItem";
import { HomePageCarouselModel } from "../../../models/homePage/HomePageCarouselModel";
import { Service } from "typedi";

@Service()
export class AdminHomePageServices {
  public async addImages(media: HomePageCarouselModel[]) {
    const homePageCarousels = await HomePageCarousel.insertMany(media);

    return new AdminHomePageCarouselDto(homePageCarousels);
  }
  public async getAllImages() {
    const homePageCarousels = await HomePageCarousel.find();

    return new AdminHomePageCarouselDto(homePageCarousels);
  }

  public async deleteImage(imageId: string) {
    //check Image Exists
    await this.findImageById(imageId);

    //delete that Image
    await HomePageCarousel.deleteOne({ _id: imageId });

    //return all Images
    return this.getAllImages();
  }

  private async findImageById(imageId: string) {
    const carousel = await HomePageCarousel.findById(imageId);
    if (!carousel) {
      throw new AppErrorDto(AdminError.CAROUSEL_IMAGE_NOT_FOUND);
    }
    return carousel;
  }
}
