import { HomePageCarousel } from "../../../models/homePage/HomePageCarouselItem";
import { HomePageCarouselDto } from "../../../dto/admin/homePage/HomePageCarouselDto";
import { HomePageCarouselMediamodel } from "../../../models/homePage/HomePageCarouselMediaModel";
import { HomePageCarouselModel } from "../../../models/homePage/HomePageCarouselModel";
import { Service } from "typedi";

@Service()
export class AdminHomePageServices {
  public async addImages(media: HomePageCarouselModel) {
    let homePageCarousels = new HomePageCarousel({ ...media });
    homePageCarousels = await homePageCarousels.save();

    return new HomePageCarouselDto(homePageCarousels);
  }
  public async getAllImages() {
    const homePageCarousels = await HomePageCarousel.find();

    const medias: HomePageCarouselMediamodel[][] = homePageCarousels.map(
      (image) => image.image
    );
    const image: any = [];
    medias.forEach((img) => image.push(...img));

    return new HomePageCarouselDto({ image } as HomePageCarouselModel);
  }
}
