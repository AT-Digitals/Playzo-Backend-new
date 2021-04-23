import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";
import { UserModel } from "./UserModel";

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
});

UserSchema.plugin(MongoDatabase.timeAuditPlugin);

export const User = model<UserModel>("users", UserSchema);
