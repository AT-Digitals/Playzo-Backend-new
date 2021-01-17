import { CarouselMediaDto } from "./CarouselMediaDto";
import { HomePageCarouselModel } from "../../models/homePage/HomePageCarouselModel";

export class CarouselDto {
  images: CarouselMediaDto[];
  constructor(carousels: HomePageCarouselModel[]) {
    this.images = carousels.map((carousel) => new CarouselMediaDto(carousel));
  }
}
