import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";
import { PreDefinedSearchModel } from "./PreDefinedSearchModel";

const PreDefinedSearchSchema = new Schema({
  name: String,
  image: String,
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: "properties",
      index: true,
    },
  ],
  order: Number,
});

PreDefinedSearchSchema.plugin(MongoDatabase.timeAuditPlugin);

export const PreDefinedSearch = model<PreDefinedSearchModel>(
  "preDefinedSearches",
  PreDefinedSearchSchema
);
