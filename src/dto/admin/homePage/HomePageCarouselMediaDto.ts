import { HomePageCarouselModel } from "../../../models/homePage/HomePageCarouselModel";

export class AdminHomePageCarouselMediaDto {
  url: string;
  id: string;
  index: number;

  constructor(carousel: HomePageCarouselModel) {
    this.url = carousel.url;
    this.id = carousel.id;
    this.index = carousel.index;
  }
}
