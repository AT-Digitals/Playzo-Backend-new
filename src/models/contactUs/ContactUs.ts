import { ContactType, ContactUsModel } from "./ContactUsModel";
import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";

export const PropertiesInfoSchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: "properties",
    index: true,
  },
  timeStamp: Date,
});

const ContactUsSchema = new Schema({
  type: {
    type: String,
    enum: [ContactType.Agent, ContactType.Enquiry, ContactType.Seller],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  place: String,
  propertiesInfo: [PropertiesInfoSchema],
  timeStamp: String,
});

ContactUsSchema.plugin(MongoDatabase.timeAuditPlugin);

export const ContactUs = model<ContactUsModel>("contactUs", ContactUsSchema);
