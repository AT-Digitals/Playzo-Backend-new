import { Document } from "mongoose";

export interface AuditTimeModel extends Document {
  createdAt: Date;
  updatedAt: Date;
}
