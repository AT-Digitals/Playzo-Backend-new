import { CarouselDto } from "../../dto/anonymous/CarouelDto";
import { HomePageCarousel } from "../../models/homePage/HomePageCarouselItem";
import { Service } from "typedi";

@Service()
export class HomePageServices {
  public async getAllImages() {
    const homePageCarousels = await HomePageCarousel.find();

    return new CarouselDto(homePageCarousels);
  }
}
