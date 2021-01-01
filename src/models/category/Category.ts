import { Schema, model } from "mongoose";

import { CategoryModel } from "./CategoryModel";
import { CategoryType } from "./CategoryType";
import MongoDatabase from "../../utils/MongoDatabase";

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  categoryType: {
    type: String,
    enum: [CategoryType.NEW, CategoryType.RESALE],
    default: CategoryType.NEW,
  },
  hidden: { type: Boolean, default: false },
});

CategorySchema.plugin(MongoDatabase.timeAuditPlugin);

export const Category = model<CategoryModel>("categories", CategorySchema);
