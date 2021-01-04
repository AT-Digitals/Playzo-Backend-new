import { HomePageCarouselMediamodel } from "../../../models/homePage/HomePageCarouselMediaModel";

export class HomePageCarouselMediaDto {
  url: string;
  id: string;
  constructor(carousel: HomePageCarouselMediamodel) {
    this.url = carousel.url;
    this.id = carousel.id;
  }
}
