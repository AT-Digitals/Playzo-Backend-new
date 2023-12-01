import { Document } from "mongoose";
import { UserModel } from "../user/UserModel";

export interface BadmitonModel extends Document {
      membership: UserModel["id"][] | UserModel[];
      date: Date,
      duration: number,
      isAnnual: boolean,
      court: number,
      notificationSent: boolean,
      startTime: string,
      endTime: string,
}
