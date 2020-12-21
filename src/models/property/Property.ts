import { Schema, model } from "mongoose";
import MongoDatabase from "../../utils/MongoDatabase";
import { PropertyModel } from "./PropertyModel";
import { Mediatype } from "./PropertyMediaModel";

export const PropertyPriceSchema = new Schema({
  from: Number,
  to: Number,
  perSqFt: Number
});

export const PropertyMediaSchema = new Schema({
  url: String,
  type: {
    type: String,
    enum: [Mediatype.image, Mediatype.video]
  }
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
  price: PropertyPriceSchema,
  media: [PropertyMediaSchema],
  amenities: [String]
});

PropertySchema.plugin(MongoDatabase.timeAuditPlugin);

export const Property = model<PropertyModel>("properties", PropertySchema);
