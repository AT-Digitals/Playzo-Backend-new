import { BookingType } from "./BookingType";
import { Document } from "mongoose";
import { PaymentType } from "./PaymentType";
import { UserBookingType } from "./UserBookingType";

export interface BookingModel extends Document {
	type: BookingType,
	user: string;
	admin: string;
	dateOfBooking: Date,
	cancelDate?: Date,
	bookingAmount?: {
		online : number, 
		cash: number,
		total: number,
		refund:number,
		upi:number
	},
	bookingtype: PaymentType,
	userBookingType:UserBookingType,
	startTime: number,
	endTime: number,
	bookingId?:string,
	startDate:Date,
	endDate:Date,
	duration:number,
	court: string,
	isAnnual: boolean,
	isRefund?: boolean,
	deleted: boolean
}
