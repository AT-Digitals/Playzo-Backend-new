import { BookingModel } from "../models/booking/BookingModel";
import DateUtils from "./DateUtils";

export default class MailTemplateUtils{
static BookingMail(booking: BookingModel) {
 return ` <!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <link
       rel="stylesheet"
       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
     />
     <title>Booking Confirmation</title>
     <div style="border: 1px solid #007bff"></div>
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
         background-color: #fff;
         border-radius: 5px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       }
       h1 {
         color: white;
         text-align: center;
         background-color: #007bff;
         padding: 20px;
       }
       p {
         margin: 6px;
         font-size: 15px;
       }
       .otp {
         font-size: 24px;
         font-weight: bold;
         text-align: center;
         color: white;
         margin-bottom: 10px;
         max-width: 200px;
         background-color: #007bff;
         /* margin: auto; */
         margin-left: 20px;
       }
       .footer {
         /* text-align: center; */
         margin-top: 20px;
         color: #888;
         padding: 0 20px;
       }
       .logo {
         display: block;
         margin: 0 auto;
         max-width: 200px;
       }
       .redirect-link {
         margin-top: 30px;
         padding: 0 20px;
         font-size: 15px;
       }
       .redirect-link a {
         color: #007bff;
         text-decoration: none;
         font-weight: bold;
       }
       .redirect-link a:hover {
         text-decoration: underline;
       }
       .fa {
         padding: 7px;
         font-size: 20px;
         width: 15px;
         border-radius: 30px;
         text-align: center;
         text-decoration: none;
         margin: 5px 2px;
       }
       .fa-facebook {
         background: white;
         color: #007bff;
       }
       .fa-instagram {
         background: white;
         color: #007bff;
       }
       .fa-youtube {
         background: white;
         color: #007bff;
       }
       .booking-details {
         padding: 0 20px;
       }
       table,
       td,
       th {
         border: 1px solid;
       }
       table {
         width: 100%;
         border-collapse: collapse;
       }
       .items {
         font-weight: 400;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <h1>Booking Confirmation</h1>
       <div class="booking-details">
         <h2>Booking Information:</h2>
         <div>
           <table style="width: 100%">
             <tr>
               <th>Type</th>
               <th>Start Date</th>
 
               <th>End Date</th>
 
               <th>Start Time</th>
 
               <th>End Time</th>
 
               <th>Online Amount</th>
             </tr>
             <tr>
               <th class="items">${booking.type}</th>
 
               <th class="items">
                 ${DateUtils.formatDate(new
                 Date(booking.startDate),"DD-MM-YYYY")}
               </th>
 
               <th class="items">
                 ${DateUtils.formatDate(booking.endDate,"DD-MM-YYYY")}
               </th>
 
               <th class="items">
                 ${DateUtils.formatDate(new Date(booking.startTime),"hh:00 A")}
               </th>
 
               <th class="items">
                 ${DateUtils.formatDate(new Date(booking.endTime),"hh:00 A")}
               </th>
 
               <th class="items">${booking.bookingAmount?.online}</th>
             </tr>
           </table>
         </div>
       </div>
       <p style="padding: 0 20px; display: flex; align-items: center">
         Your booking has been confirmed. We look forward to welcoming you!
         <i
           class="fa fa-check-circle"
           style="font-size: 32px; color: #007bff"
         ></i>
       </p>
 
       <div
         style="
           background: #007bff;
           display: flex;
           justify-content: space-between;
           align-items: center;
         "
       >
         <p style="padding: 20px; font-size: 12px; color: #fff">
           Contact, <br />
           39/6 KCP Thottam, Kumalan Kuttai, Erode,
           <br />Tamil Nadu - 638011 <br />
           +91 70944 60944
           <br />
           +91 91088 83555
         </p>
         <div style="padding: 0 20px">
           <div style="display: flex; justify-content: flex-end; gap: 8px">
             <a
               href="https://www.facebook.com/PlayZo33"
               class="fa fa-facebook"
             ></a>
             <a
               href="https://www.instagram.com/playzo_33/"
               class="fa fa-instagram"
             ></a>
             <a
               href="https://www.instagram.com/playzo_33/"
               class="fa fa-youtube"
             ></a>
           </div>
           <p style="color: white; font-size: 12px">
             Copyright © 2024 Playzo33 | All Rights Reserved
           </p>
         </div>
       </div>
     </div>
   </body>
 </html>`;

  }

  static BulkBookingMail(bookings: any[]) {
    let emails = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
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
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: white;
            text-align: center;
            background-color: #007bff;
            padding: 20px;
          }
          p {
            margin: 6px;
            font-size: 15px;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: white;
            margin-bottom: 10px;
            max-width: 200px;
            background-color: #007bff;
            margin-left: 20px;
          }
          .footer {
            margin-top: 20px;
            color: #888;
            padding: 0 20px;
          }
          .logo {
            display: block;
            margin: 0 auto;
            max-width: 200px;
          }
          .redirect-link {
            margin-top: 30px;
            padding: 0 20px;
            font-size: 15px;
          }
          .redirect-link a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
          }
          .redirect-link a:hover {
            text-decoration: underline;
          }
          .fa {
            padding: 7px;
            font-size: 20px;
            width: 15px;
            border-radius: 30px;
            text-align: center;
            text-decoration: none;
            margin: 5px 2px;
          }
          .fa-facebook {
            background: white;
            color: #007bff;
          }
          .fa-instagram {
            background: white;
            color: #007bff;
          }
          .fa-youtube {
            background: white;
            color: #007bff;
          }
          .booking-details {
            padding: 0 20px;
          }
          table,
          td,
          th {
            border: 1px solid;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          .items {
            font-weight: 400;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Booking Confirmation</h1>
          <div class="booking-details">
            <h2>Booking Information:</h2>
            <div>
              <table style="width: 100%">
                <tr>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Online Amount</th>
                </tr>`;
  
    bookings.forEach(booking => {
      emails += `
                <tr>
                  <td>${booking.type}</td>
                  <td>${DateUtils.formatDate(new Date(booking.startDate), "DD-MM-YYYY")}</td>
                  <td>${DateUtils.formatDate(new Date(booking.endDate), "DD-MM-YYYY")}</td>
                  <td>${DateUtils.formatDate(new Date(booking.startTime), "hh:00 A")}</td>
                  <td>${DateUtils.formatDate(new Date(booking.endTime), "hh:00 A")}</td>
                  <td>${booking.bookingAmount?.online}</td>
                </tr>`;
    });
  
    emails += `</table>
            </div>
          </div>
          <p style="padding: 0 20px; display: flex; align-items: center">
            Your booking has been confirmed. We look forward to welcoming you!
            <i class="fa fa-check-circle" style="font-size: 32px; color: #007bff"></i>
          </p>

<div
  style="
    background: #007bff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  "
>
  <p style="padding: 20px; font-size: 12px; color: #fff">
    Contact, <br />
    39/6 KCP Thottam, Kumalan Kuttai, Erode,
    <br />Tamil Nadu - 638011 <br />
    +91 70944 60944
    <br />
    +91 91088 83555
  </p>
  <div style="padding: 0 20px">
    <div style="display: flex; justify-content: flex-end; gap: 8px">
      <a
        href="https://www.facebook.com/PlayZo33"
        class="fa fa-facebook"
      ></a>
      <a
        href="https://www.instagram.com/playzo_33/"
        class="fa fa-instagram"
      ></a>
      <a
        href="https://www.instagram.com/playzo_33/"
        class="fa fa-youtube"
      ></a>
    </div>
    <p style="color: white; font-size: 12px">
      Copyright © 2024 Playzo33 | All Rights Reserved
    </p>
  </div>
</div>
</div>
</body>
</html>`;
    return emails;
  }

  static UpdateAmountMail(booking: BookingModel) {
    const amount =( booking.bookingAmount?.cash??0) + (booking.bookingAmount?.upi??0)
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <title>Booking Confirmation</title>
    <div style="border: 1px solid #007bff"></div>
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
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: white;
        text-align: center;
        background-color: #007bff;
        padding: 20px;
      }
      p {
        margin: 6px;
        font-size: 15px;
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: white;
        margin-bottom: 10px;
        max-width: 200px;
        background-color: #007bff;
        /* margin: auto; */
        margin-left: 20px;
      }
      .footer {
        /* text-align: center; */
        margin-top: 20px;
        color: #888;
        padding: 0 20px;
      }
      .logo {
        display: block;
        margin: 0 auto;
        max-width: 200px;
      }
      .redirect-link {
        margin-top: 30px;
        padding: 0 20px;
        font-size: 15px;
      }
      .redirect-link a {
        color: #007bff;
        text-decoration: none;
        font-weight: bold;
      }
      .redirect-link a:hover {
        text-decoration: underline;
      }
      .fa {
        padding: 7px;
        font-size: 20px;
        width: 15px;
        border-radius: 30px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
      }
      .fa-facebook {
        background: white;
        color: #007bff;
      }
      .fa-instagram {
        background: white;
        color: #007bff;
      }
      .fa-youtube {
        background: white;
        color: #007bff;
      }
      .booking-details {
        padding: 0 20px;
      }
      table,
      td,
      th {
        border: 1px solid;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      .items {
        font-weight: 400;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Payment Confirmation</h1>
      <div class="booking-details">
        <div
          style="
            display: flex;
            align-items: center;
            gap: 5px;
            margin: auto;
            justify-content: center;
          "
        >
          <i
            class="fa fa-check-circle"
            style="font-size: 32px; color: #007bff"
          ></i>
          <p style="font-size: 20px; color: #007bff">Payment Successful!</p>
        </div>
        <p style="text-align: center">
          Thank you for Your payment of Rs.${amount} has
          been recived.
        </p>
        <p>Payment Details:</p>
        <div>
          <table style="width: 100%">
            <tr>
              <th>Type</th>
              <th>Start Date</th>

              <th>End Date</th>

              <th>Start Time</th>

              <th>End Time</th>
              <th>Cash Amount</th>
              <th>Upi Amount</th>
              <th>Online Amount</th>
              <th>Total Amount</th>
            </tr>
            <tr>
              <th class="items">${booking.type}</th>

              <th class="items">
                ${DateUtils.formatDate(new
                Date(booking.startDate),"DD-MM-YYYY")}
              </th>

              <th class="items">
                ${DateUtils.formatDate(booking.endDate,"DD-MM-YYYY")}
              </th>

              <th class="items">
                ${DateUtils.formatDate(new Date(booking.startTime),"hh:00 A")}
              </th>

              <th class="items">
                ${DateUtils.formatDate(new Date(booking.endTime),"hh:00 A")}
              </th>
              <th class="items">${booking.bookingAmount?.cash}</th>
              <th class="items">${booking.bookingAmount?.upi}</th>
              <th class="items">${booking.bookingAmount?.online}</th>
              <th class="items">${booking.bookingAmount?.total}</th>
            </tr>
          </table>
        </div>
      </div>

      <div
        style="
          background: #007bff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        "
      >
        <p style="padding: 20px; font-size: 12px; color: #fff">
          Contact, <br />
          39/6 KCP Thottam, Kumalan Kuttai, Erode,
          <br />Tamil Nadu - 638011 <br />
          +91 70944 60944
          <br />
          +91 91088 83555
        </p>
        <div style="padding: 0 20px">
          <div style="display: flex; justify-content: flex-end; gap: 8px">
            <a
              href="https://www.facebook.com/PlayZo33"
              class="fa fa-facebook"
            ></a>
            <a
              href="https://www.instagram.com/playzo_33/"
              class="fa fa-instagram"
            ></a>
            <a
              href="https://www.instagram.com/playzo_33/"
              class="fa fa-youtube"
            ></a>
          </div>
          <p style="color: white; font-size: 12px">
            Copyright © 2024 Playzo33 | All Rights Reserved
          </p>
        </div>
      </div>
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Details</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
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
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: white;
        text-align: center;
        background-color: #007bff;
        padding: 20px;
      }

      p {
        margin-bottom: 20px;
      }

      .contact-info {
        margin-bottom: 30px;
        padding: 0 20px;
      }

      .contact-info p {
        margin-bottom: 5px;
      }

      .footer {
        text-align: center;
        margin-top: 20px;
        color: #888;
      }
      .fa {
        padding: 7px;
        font-size: 20px;
        width: 15px;
        border-radius: 30px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
      }
      .fa-facebook {
        background: white;
        color: #007bff;
      }
      .fa-instagram {
        background: white;
        color: #007bff;
      }
      .fa-youtube {
        background: white;
        color: #007bff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Contact Details</h1>
      <div class="contact-info">
        <p style="font-size: 15px; font-weight: 700">Customer Details:</p>
        <p><strong>Name : </strong> ${request.userName}</p>
        <p><strong>Email : </strong> ${request.userEmail}</p>
        <p><strong>Phone:</strong>${request.phoneNumber}</p>
        <p><strong>Project Type:</strong> ${request.projectType}</p>
        <p><strong>Message:</strong> ${request.enquiryMessage}</p>
      </div>
      <p style="padding: 0 20px">
        If you have any questions or need further assistance, feel free to
        contact us using the information provided above.
      </p>
      <p style="padding: 0 20px">
        Our team is dedicated to providing you with the best support possible.
        Whether you have inquiries about our services or need assistance with a
        project, we're here to help.
      </p>

      <div
        style="
          background: #007bff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        "
      >
        <p style="padding: 20px; font-size: 12px; color: #fff">
          Contact, <br />
          39/6 KCP Thottam, Kumalan Kuttai, Erode,
          <br />Tamil Nadu - 638011 <br />
          +91 70944 60944
          <br />
          +91 91088 83555
        </p>
        <div style="padding: 0 20px">
          <div style="display: flex; justify-content: flex-end; gap: 8px">
            <a
              href="https://www.facebook.com/PlayZo33"
              class="fa fa-facebook"
            ></a>
            <a
              href="https://www.instagram.com/playzo_33/"
              class="fa fa-instagram"
            ></a>
            <a
              href="https://www.instagram.com/playzo_33/"
              class="fa fa-youtube"
            ></a>
          </div>
          <p style="color: white; font-size: 12px">
            Copyright © 2024 Playzo33 | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
     }


}