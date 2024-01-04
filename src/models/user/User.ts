import { Schema, model } from "mongoose";

import MongoDatabase from "../../utils/MongoDatabase";
import { UserModel } from "./UserModel";
import { UserType } from "../../dto/auth/UserType";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  phone:Number,
  userType:{
    type: String,
    enum: [],
    default: UserType.USER,
  },
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
