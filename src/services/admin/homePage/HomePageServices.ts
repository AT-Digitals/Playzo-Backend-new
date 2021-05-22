import { AdminError } from "../../../dto/error/AdminError";
import { AdminHomePageCarouselDto } from "../../../dto/admin/homePage/HomePageCarouselDto";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { HomePageCarousel } from "../../../models/homePage/HomePageCarouselItem";
import { HomePageCarouselModel } from "../../../models/homePage/HomePageCarouselModel";
import { HomePageCarouselOrderUpdateRequestDto } from "../../../dto/admin/homePage/HomePageCarouselRequestDto";
import { Service } from "typedi";

@Service()
export class AdminHomePageServices {
  public async addImages(media: string[]) {
    const allHomePageCarousels = await HomePageCarousel.find();
    const newCarousel: HomePageCarouselModel = {
      url: media[0],
      index: allHomePageCarousels.length,
    } as HomePageCarouselModel;
    let homePageCarousel = new HomePageCarousel({ ...newCarousel });
    homePageCarousel = await homePageCarousel.save();

    return homePageCarousel;
  }

  public async getAllImages() {
    const homePageCarousels = await HomePageCarousel.find();
    const sortedHomePageCarousels: HomePageCarouselModel[] = [];

    homePageCarousels.forEach((carousel) => {
      sortedHomePageCarousels[carousel.index] = carousel;
    });

    return new AdminHomePageCarouselDto(sortedHomePageCarousels);
  }

  public async changeOrder(updateDto: HomePageCarouselOrderUpdateRequestDto) {
    const homePageCarousels = await HomePageCarousel.find();
    let carousel = await this.findImageById(updateDto.id);

    let relCarousel: HomePageCarouselModel | undefined;

    if (updateDto.moveUp) {
      if (carousel.index !== 0) {
        relCarousel = homePageCarousels.find(
          (carouselsInner) => carouselsInner.index === carousel.index - 1
        );
        carousel.index = carousel.index - 1;
        if (relCarousel) {
          relCarousel.index = relCarousel.index + 1;
        }
      }
    } else {
      if (carousel.index !== homePageCarousels.length - 1) {
        relCarousel = homePageCarousels.find(
          (carouselsInner) => carouselsInner.index === carousel.index + 1
        );
        carousel.index = carousel.index + 1;
        if (relCarousel) {
          relCarousel.index = relCarousel.index - 1;
        }
      }
    }

    carousel = await carousel.save();
    if (relCarousel) {
      relCarousel = await relCarousel.save();
    }
    return carousel;
  }

  public async deleteImage(imageId: string) {
    //check Image Exists
    const carousel = await this.findImageById(imageId);

    //delete that Image
    await HomePageCarousel.deleteOne({ _id: imageId });

    const carousels = await HomePageCarousel.find();

    await HomePageCarousel.deleteMany();

    const newCarousels = carousels.filter((carouselInner) => {
      if (carouselInner.index > carousel.index) {
        carouselInner.index = carouselInner.index - 1;
      }
      return {
        url: carouselInner.url,
        index: carouselInner.index,
      };
    });

    await HomePageCarousel.insertMany(newCarousels);

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
