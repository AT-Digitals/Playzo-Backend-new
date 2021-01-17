import { AdminHomePageCarouselMediaDto } from "./HomePageCarouselMediaDto";
import { HomePageCarouselModel } from "../../../models/homePage/HomePageCarouselModel";

export class AdminHomePageCarouselDto {
  images: AdminHomePageCarouselMediaDto[];
  constructor(carousels: HomePageCarouselModel[]) {
    this.images = carousels.map(
      (carousel) => new AdminHomePageCarouselMediaDto(carousel)
    );
  }
}
