import { HomePageCarouselMediaDto } from "./HomePageCarouselMediaDto";
import { HomePageCarouselModel } from "../../../models/homePage/HomePageCarouselModel";

export class HomePageCarouselDto {
  image: HomePageCarouselMediaDto[];
  constructor(carousel: HomePageCarouselModel) {
    this.image = carousel.image.map((url) => new HomePageCarouselMediaDto(url));
  }
}
