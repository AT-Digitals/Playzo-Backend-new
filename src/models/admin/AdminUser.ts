import { Schema, model } from "mongoose";

import AdminUserModel from "./AdminUserModel";
import MongoDatabase from "../../utils/MongoDatabase";

const AdminUserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: { type: String, required: true },
});

AdminUserSchema.methods.setPassword = MongoDatabase.setPassword;
AdminUserSchema.methods.validateUser = MongoDatabase.validateUser;

AdminUserSchema.plugin(MongoDatabase.timeAuditPlugin);

export const AdminUser = model<AdminUserModel>("admins", AdminUserSchema);
