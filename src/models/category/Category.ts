import { Schema, model } from "mongoose";

import { CategoryModel } from "./CategoryModel";
import MongoDatabase from "../../utils/MongoDatabase";

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  hidden: { type: Boolean, default: false }
});

CategorySchema.plugin(MongoDatabase.timeAuditPlugin);

export const Category = model<CategoryModel>("categories", CategorySchema);
