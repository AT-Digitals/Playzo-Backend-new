import { Schema, model } from "mongoose";

import { Mediatype } from "./PropertyMediaModel";
import MongoDatabase from "../../utils/MongoDatabase";
import { PropertyModel } from "./PropertyModel";

export const PropertyPriceSchema = new Schema({
  from: Number,
  to: Number,
  perSqFt: Number,
});

export const PropertyMediaSchema = new Schema({
  url: String,
  type: {
    type: String,
    enum: [Mediatype.image, Mediatype.video],
  },
});

const SpecificationSchema = new Schema({
  name: String,
  value: String,
});

export const PropertySpecificationSchema = new Schema({
  Flooring: [SpecificationSchema],
  Windows: [SpecificationSchema],
  Bathroom: [SpecificationSchema],
  Kitchen: [SpecificationSchema],
  Electrical: [SpecificationSchema],
  Fittings: [SpecificationSchema],
  Others: [SpecificationSchema],
});

const PropertySchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, index: true },
  subLocation: String,
  reraNumber: String,
  possessionBy: Date,
  categories: [{ type: Schema.Types.ObjectId, ref: "categories", index: true }],
  numberOfUnits: Number,
  usps: [String],
  price: PropertyPriceSchema,
  media: [PropertyMediaSchema],
  amenities: [String],
  specifications: PropertySpecificationSchema,
});

PropertySchema.plugin(MongoDatabase.timeAuditPlugin);

export const Property = model<PropertyModel>("properties", PropertySchema);
