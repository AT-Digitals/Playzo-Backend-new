import { Document } from "mongoose";

export enum Mediatype {
  image = "image",
  video = "video",
}

export interface PropertyMediaModel extends Document {
  type: Mediatype;
  url: string;
}
