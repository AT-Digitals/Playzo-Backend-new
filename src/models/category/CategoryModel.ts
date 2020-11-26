import { CategoryType } from "./CategoryType";
import { Document } from "mongoose";

export interface CategoryModel extends Document {
  name: string;
  displayName: string;
  categoryType: CategoryType;
  hidden: boolean;
}
