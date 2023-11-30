import { Schema, model } from "mongoose";

import { BookingType } from "../booking/BookingType";
import { ExpenseManagementModel } from "./ExpenseManagementModel";
import MongoDatabase from "../../utils/MongoDatabase";
import { PettyCashSchema } from "./PettyCash";

const ExpenseManagementSchema = new Schema({
    type: BookingType,
    amount: Number,
    date: Date,
    pettyCash: PettyCashSchema,
    billUrl: String
});

ExpenseManagementSchema.plugin(MongoDatabase.timeAuditPlugin);

export const ExpenseManagement = model<ExpenseManagementModel>("expenseManagement", ExpenseManagementSchema);
