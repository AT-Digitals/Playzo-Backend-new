import { Document } from "mongoose";

export interface HomePageCarouselModel extends Document {
  url: string;
  index: number;
}
