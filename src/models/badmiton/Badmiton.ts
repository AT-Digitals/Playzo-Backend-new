import { Schema, model } from "mongoose";

import { BadmitonModel } from "./BadmitonModel";
import MongoDatabase from "../../utils/MongoDatabase";

const BadmitonSchema = new Schema({
    membership:  {
        type: Schema.Types.ObjectId,
        ref: "users",
        index: true,
      },
    date: Date,
    duration: Number,
    isAnnual: Boolean,
    court: Number,
    notificationSent: Boolean,
    startTime: String,
      endTime: String,
});

BadmitonSchema.plugin(MongoDatabase.timeAuditPlugin);

export const Badmiton = model<BadmitonModel>("badmiton", BadmitonSchema);
