import { Schema, model } from "mongoose";

import { HomePageCarouselModel } from "./HomePageCarouselModel";
import MongoDatabase from "../../utils/MongoDatabase";

export const HomePageCarouselMediaSchema = new Schema({
  url: String,
});

const HomePageCarouselSchema = new Schema({
  image: [HomePageCarouselMediaSchema],
});

HomePageCarouselSchema.plugin(MongoDatabase.timeAuditPlugin);

export const HomePageCarousel = model<HomePageCarouselModel>(
  "homePageCarouselItem",
  HomePageCarouselSchema
);
