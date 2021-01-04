import { Document } from "mongoose";
import { HomePageCarouselMediamodel } from "./HomePageCarouselMediaModel";

export interface HomePageCarouselModel extends Document {
  image: HomePageCarouselMediamodel[];
}
