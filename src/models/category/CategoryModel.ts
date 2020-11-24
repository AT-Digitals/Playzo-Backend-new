import { Document } from "mongoose";

export interface CategoryModel extends Document {
  name: string;
  hidden: boolean;
}
