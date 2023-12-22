import { Schema, model } from "mongoose";

import { EnquiryModel } from "./EnquiryModel";
import MongoDatabase from "../../utils/MongoDatabase";

const enquirySchema = new Schema({
  userName: String,
  userEmail: String,
  phoneNumber: Number, 
  enquiryMessage: String,
  deleted: false

});

enquirySchema.plugin(MongoDatabase.timeAuditPlugin);

export const Enquiry = model<EnquiryModel>("enquiries", enquirySchema);
