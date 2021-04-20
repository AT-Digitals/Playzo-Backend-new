import { ContactType, ContactUsModel } from "./ContactUsModel";
import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";

export const ContactedUserDetailSchema = new Schema({
  name: String,
  email: String,
  place: String,
  phone: String,
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "properties",
    index: true,
  },
});

const ContactUsSchema = new Schema({
  type: {
    type: String,
    enum: [ContactType.Agent, ContactType.Enquiry, ContactType.Seller],
  },
  userDetails: [ContactedUserDetailSchema],
});

ContactUsSchema.plugin(MongoDatabase.timeAuditPlugin);

export const ContactUs = model<ContactUsModel>("contactUs", ContactUsSchema);
