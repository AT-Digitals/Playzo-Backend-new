import { HomePageCarouselModel } from "../../models/homePage/HomePageCarouselModel";

export class CarouselMediaDto {
  url: string;
  id: string;

  constructor(carousel: HomePageCarouselModel) {
    this.url = carousel.url;
    this.id = carousel.id;
  }
}
