import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";
import { UserModel } from "./UserModel";

const UserDeviceSchema = new Schema({
  os: String,
  browser: String,
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  alternativeNumber: String,
  name: String,
  otp: String,
  isVerified: Boolean,
  avatar: String,
  favouriteProperties: [
    {
      type: Schema.Types.ObjectId,
      ref: "properties",
      index: true,
    },
  ],
  accountCreationTimeStamp: Date,
  lastLoginTimeStamp: Date,
  userLocation: String,
  userDeviceInfo: UserDeviceSchema,
});

UserSchema.plugin(MongoDatabase.timeAuditPlugin);

export const User = model<UserModel>("users", UserSchema);
