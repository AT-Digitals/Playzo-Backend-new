import { BookingModel } from "../models/booking/BookingModel";
import DateUtils from "./DateUtils";

export default class MailTemplateUtils{
static BookingMail(booking: BookingModel) {
 return ` <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Booking Confirmation</title>
 <style>
   body {
     font-family: Arial, sans-serif;
     line-height: 1.6;
     background-color: #f4f4f4;
     margin: 0;
     padding: 0;
   }
 
   .container {
     max-width: 600px;
     margin: 20px auto;
     padding: 20px;
     background-color: #fff;
     border-radius: 5px;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   }
 
   h1 {
     color: #333;
     text-align: center;
   }
 
   p {
     margin-bottom: 20px;
   }
 
   .booking-details {
     margin-bottom: 30px;
   }
 
   .booking-details h2 {
     margin-bottom: 10px;
     font-size: 18px;
   }
 
   .booking-details p {
     margin: 0;
   }
 
   .footer {
     text-align: center;
     margin-top: 20px;
     color: #888;
   }
 </style>
 </head>
 <body>
 
 <div class="container">
   <h1>Booking Confirmation</h1>
   <div class="booking-details">
     <h2>Booking Information:</h2>
     <p><strong><strong>Type :</strong> ${booking.type} </p>
     <p><strong>Start Date :</strong> ${DateUtils.formatDate(new Date(booking.startDate),"DD-MM-YYYY")}</p>
     <p><strong>End Date :</strong> ${DateUtils.formatDate(booking.endDate,"DD-MM-YYYY")} </p>
     <p><strong>Start Time :</strong> ${DateUtils.formatDate(new Date(booking.startTime),"hh:00 A")}</p>
     <p><strong>End Time :</strong> ${DateUtils.formatDate(new Date(booking.endTime),"hh:00 A")}</p>
     <p><strong>Online Amount :</strong> ${booking.bookingAmount?.online}</p>
   </div>
   <p>Your booking has been confirmed. We look forward to welcoming you!</p>
   <p class="footer">This email was sent by <a href="http://playzo33.in/">http://playzo33.in/</a></p>
 </div>
 
 </body>
 </html>`;

  }

  static UpdateAmountMail(booking: BookingModel) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #F4F4F4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        text-align: center;
      }
      p {
        margin-bottom: 20px;
      }
      .booking-details {
        margin-bottom: 30px;
      }
      .booking-details h2 {
        margin-bottom: 10px;
        font-size: 18px;
      }
      .booking-details p {
        margin: 0;  }
      .footer {
        text-align: center;
        margin-top: 20px;
        color: #888;
      }
    .row {
      display: flex;
    padding: 10px 50px;
    margin: 20px 0px;
    }
    .column {
      width: 300px;
    }
    </style>
    </head>
    <body>
    <div class="container">
      <h1>Payment Confirmation</h1>
      <div class="booking-details">
        <h2 style="padding: 0px 50px;">Payment Information:</h2>
    <div class="row">
    <div class="column">
        <p><strong><strong>Type :</strong></p>
        <p><strong>Start Date :</strong></p>
        <p><strong>End Date :</strong></p>
        <p><strong>Start Time :</strong></p>
    <p><strong>End Time :</strong></p>
        <p><strong>Cash Amount :</strong></p>
        <p><strong>UPI Amount :</strong></p>
        <p><strong>Online Amount :</strong></p>
        <p><strong>Total Amount :</strong></p>
    </div>
    <div class="column">
     <p>${booking.type} </p>
        <p>${DateUtils.formatDate(new Date(booking.startDate),"DD-MM-YYYY")}</p>
        <p>${DateUtils.formatDate(new Date(booking.endDate),"DD-MM-YYYY")} </p>
        <p>${DateUtils.formatDate(new Date(booking.startTime),"hh:00 A")}</p>
        <p>${DateUtils.formatDate(new Date(booking.endTime),"hh:00 A")}</p>
        <p>${booking.bookingAmount?.cash}</p>
        <p>${booking.bookingAmount?.upi}</p>
        <p>${booking.bookingAmount?.online}</p>
        <p>${booking.bookingAmount?.total}</p>
    </div>
      </div>
      <p>Your booking has been confirmed. We look forward to welcoming you!</p>
      <p class="footer">This email was sent by <a href="http://playzo33.in/">http://playzo33.in/</a></p>
    </div>
    </body>
    </html>
`;
   
     }
  static EnquiryMail(request: any) {

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact Details</title>
<style>
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #333;
    text-align: center;
  }

  p {
    margin-bottom: 20px;
  }

  .contact-info {
    margin-bottom: 30px;
  }

  .contact-info p {
    margin-bottom: 5px;
  }

  .footer {
    text-align: center;
    margin-top: 20px;
    color: #888;
  }
</style>
</head>
<body>

<div class="container">
  <h1>Contact Details</h1>
  <div class="contact-info">
  <p><strong>Name : </strong> ${request.userName}</p>
    <p><strong>Email : </strong> ${request.userEmail}</p>
    <p><strong>Phone:</strong>${request.phoneNumber}</p>
    <p><strong>Project Type:</strong> ${request.projectType}</p>
    <p><strong>Message:</strong> ${request.enquiryMessage}</p>
  </div>
  <p>If you have any questions or need further assistance, feel free to contact us using the information provided above.</p>
  <p class="footer">This email was sent by <a href="http://playzo33.in/">http://playzo33.in/</a></p>
</div>

</body>
</html>
`;
     }


}