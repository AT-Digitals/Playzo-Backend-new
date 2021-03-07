import { PropertyModel, PropertyType } from "./PropertyModel";
import { Schema, model } from "mongoose";

import { CategoryType } from "./PropertyFloorPlanModel";
import { Mediatype } from "./PropertyMediaModel";
import MongoDatabase from "../../utils/MongoDatabase";

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

export const AreaSchema = new Schema({
  sqFt: String,
  details: String,
});

export const FloorPlanSchema = new Schema({
  image: String,
  area: AreaSchema,
  noOfUnits: String,
  agreementPrice: String,
});

export const PropertyFloorPlanSchema = new Schema({
  category: {
    type: String,
    enum: [CategoryType.Appartment, CategoryType.Plot, CategoryType.Villa],
  },
  variation: String,
  floorPlans: [FloorPlanSchema],
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

export const PropertyLocationSchema = new Schema({
  latitude: Number,
  longitude: Number,
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
  propertyDeveloper: {
    type: Schema.Types.ObjectId,
    ref: "propertyDevelopers",
    index: true,
  },
  floorPlan: [PropertyFloorPlanSchema],
  paymentTranches: String,
  location: PropertyLocationSchema,
  propertyType: {
    type: String,
    enum: [PropertyType.Appartment, PropertyType.Villa],
  },
});

PropertySchema.plugin(MongoDatabase.timeAuditPlugin);

export const Property = model<PropertyModel>("properties", PropertySchema);
