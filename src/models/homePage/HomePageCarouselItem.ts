import { Schema, model } from "mongoose";

import { HomePageCarouselModel } from "./HomePageCarouselModel";

export const HomePageCarouselMediaSchema = new Schema({
  url: String,
  index: Number,
});

export const HomePageCarousel = model<HomePageCarouselModel>(
  "homePageCarouselItem",
  HomePageCarouselMediaSchema
);
