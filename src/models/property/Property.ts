import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";
import { PropertyModel } from "./PropertyModel";

export const PropertyPriceSchema = new Schema({
  from: Number,
  to: Number,
  perSqFt: Number
});

const PropertySchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, index: true },
  subLocation: String,
  reraNumber: String,
  possessionBy: Date,
  category: { type: Schema.Types.ObjectId, ref: "categories", index: true },
  numberOfUnits: Number,
  usps: [String],
  price: PropertyPriceSchema
});

PropertySchema.plugin(MongoDatabase.timeAuditPlugin);

export const Property = model<PropertyModel>("properties", PropertySchema);
