import { BookingModel } from "../models/booking/BookingModel";
import DateUtils from "./DateUtils";

export default class MailTemplateUtils{
static BookingMail(booking: BookingModel) {
 return `<div>
 <h2>Booking Details</h2>
 <p>Type : ${booking.type} </p>
 <p>Start Date : ${DateUtils.formatDate(new Date(booking.startDate),"DD-MM-YYYY")}</p>
 <p>End Date : ${DateUtils.formatDate(booking.endDate,"DD-MM-YYYY")} </p>
 <p>Start Time : ${DateUtils.formatDate(new Date(booking.startTime),"hh:00 A")}</p>
 <p>End Time : ${DateUtils.formatDate(new Date(booking.endTime),"hh:00 A")}</p>
 <p>Cash Amount : ${booking.bookingAmount?.cash}</p>
 <p>Online Amount : ${booking.bookingAmount?.online}</p>
</div>`;

  }

  static UpdateAmountMail(booking: BookingModel) {
    return `<div>
    <h2>Paid Amount Details</h2>
    <p>Type : ${booking.type} </p>
    <p>Start Date : ${DateUtils.formatDate(new Date(booking.startDate),"DD-MM-YYYY")}</p>
    <p>End Date : ${DateUtils.formatDate(booking.endDate,"DD-MM-YYYY")} </p>
    <p>Start Time : ${DateUtils.formatDate(new Date(booking.startTime),"hh:00 A")}</p>
    <p>End Time : ${DateUtils.formatDate(new Date(booking.endTime),"hh:00 A")}</p>
    <p>Cash Amount : ${booking.bookingAmount?.cash}</p>
    <p>UPI Amount : ${booking.bookingAmount?.upi}</p>
    <p>Online Amount : ${booking.bookingAmount?.online}</p>
   </div>`;
   
     }
  static EnquiryMail(request: any) {

    return `<div>
    <h2>Contact Details</h2>
    <p>Name : ${request.userName} </p>
    <p>Email : ${request.userEmail}</p>
    <p>project Type : ${request.projectType} </p>
    <p>Message : ${request.enquiryMessage}</p>
  </div>`;
     }
}