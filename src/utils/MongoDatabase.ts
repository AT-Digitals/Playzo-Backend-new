import mongoose, { HookNextFunction, Schema } from "mongoose";

import { AuditTimeModel } from "../models/common/auditTimeModel";
import { MongoError } from "mongodb";
import { PasswordHash } from "./PasswordHash";

export default class MongoDatabase {
  private static connectionProperty: mongoose.ConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  private static dbStatusFn(error: mongoose.CallbackError) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Successfully connected MongoDB");
    }
  }

  private static getConnectionString() {
    const url = process.env.DB_URL;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;
    const authDatabase = process.env.DB_AUTH_DATABASE;
    const protocol =
      process.env.DB_USE_SRV === process.env.DB_USE_SRV ? "mongodb+srv" : "mongodb";
    return (
      `${protocol}://` +
      (user ? `${user}:${password}@` : "@") +
      `${url}/${database}` +
      (authDatabase ? `?authSource=${authDatabase}` : "")
    );
  }

  static async connect() {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(
      this.getConnectionString(),
      this.connectionProperty,
      this.dbStatusFn
    );
  }

  static updateTimeModified(
    this: AuditTimeModel,
    next: HookNextFunction
  ): void {
    this.updatedAt = new Date();
    next();
  }

  static async setPassword(password: string) {
    (this as any).password = await PasswordHash.encrypt(password);
  }

  static validateUser(password: string) {
    const passwordHash = (this as any).password;
    return PasswordHash.compare(passwordHash, password);
  }

  static isDuplicationError(error: MongoError) {
    return error.name === "MongoError" && error.code === 11000;
  }

  static timeAuditPlugin = (schema: Schema<any>): void => {
    schema.path("timeCreated", { type: Date, default: Date.now });
    schema.path("timeUpdated", { type: Date, default: Date.now });
    schema.pre("save", MongoDatabase.updateTimeModified);
  };
}
