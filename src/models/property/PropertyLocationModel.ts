import { Document } from "mongoose";

export interface PropertyLocationModel extends Document {
  latitude: number;
  longitude: number;
}
