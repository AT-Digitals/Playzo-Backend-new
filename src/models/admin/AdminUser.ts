import { Schema, model } from "mongoose";

import { AccessType } from "../../dto/auth/AccessType";
import AdminUserModel from "./AdminUserModel";
import MongoDatabase from "../../utils/MongoDatabase";
import { UserType } from "../../dto/auth/UserType";

const AdminUserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: { type: String, required: true },
  phone: Number,
  userType:{
    type: String,
    enum: [],
    default: UserType.ADMIN,
  },
  accessType:{
    type: String,
    enum: [],
    default: AccessType.ALL,
    required: false
  },
});

AdminUserSchema.methods.setPassword = MongoDatabase.setPassword;
AdminUserSchema.methods.validateUser = MongoDatabase.validateUser;

AdminUserSchema.plugin(MongoDatabase.timeAuditPlugin);

export const AdminUser = model<AdminUserModel>("admins", AdminUserSchema);
