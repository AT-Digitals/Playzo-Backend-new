import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";
import { UserModel } from "./UserModel";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  bookingHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "bookings",
      index: true,
    },
  ]
});

UserSchema.methods.setPassword = MongoDatabase.setPassword;
UserSchema.methods.validateUser = MongoDatabase.validateUser;
UserSchema.plugin(MongoDatabase.timeAuditPlugin);

export const User = model<UserModel>("users", UserSchema);
