import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";
import { PropertyDeveloperModel } from "./PropertyDeveloperModel";

const PropertyDeveloperSchema = new Schema({
  name: String,
  totalProjects: String,
  experience: String,
  content: String,
});

PropertyDeveloperSchema.plugin(MongoDatabase.timeAuditPlugin);

export const PropertyDeveloper = model<PropertyDeveloperModel>(
  "propertyDevelopers",
  PropertyDeveloperSchema
);
