import { Document } from "mongoose";

export interface AuditTimeModel extends Document {
  timeCreated: Date;
  timeUpdated: Date;
}
