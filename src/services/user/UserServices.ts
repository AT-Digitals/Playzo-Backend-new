import { AdminError } from "../../dto/error/AdminError";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { HttpStatusCode } from "../../dto/error/HttpStatusCode";
import PasswordRequestDto from "../../dto/auth/PasswordRequestDto";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/user/UserDto";
import UserLoginRequestDto from "../../dto/auth/UserLoginRequestDto";
import { UserModel } from "../../models/user/UserModel";
import { UserRequestDto } from "../../dto/user/UserRequestDto";
import moment from "moment";
import { randomAlphaNumeric } from "../../utils/helpFunc";

// import MailUtils from "../../utils/MailUtils";










// import MailTemplateUtils from "../../utils/MailTemplateUtils";

@Service()
export class UserServices {
  public async createUser(UserDto: UserRequestDto) {
    const userEmail = await User.findOne({
      email: UserDto.email
    });
    if (userEmail) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }
    let user = new User(UserDto);
    await user.setPassword(UserDto.password);
    user = await user.save();
    return user;
  }

  public async getAllUsers() {
    const users = await User.find().populate("bookings");
    return users.map((user) => new UserDto(user));
  }

  async updateById(id: string, request: any) {
    let user = await User.findOne({_id:id});
    if (!user) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    user.phone = request.phone;
    user = await user.save();
    return user;
  }

  public async getUser(userId: string) {
    let user = await User.findById(userId);
    if (!user) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }
    user = await user.populate("bookings").execPopulate();
    return new UserDto(user);
  }

  public async login(loginDto: UserLoginRequestDto) {
    const user = await User.findOne({
      email: loginDto.email,
    });
    if (!user || !(await user.validateUser(loginDto.password))) {
      throw new AppErrorDto(
        AppError.AUTHENTICATION_ERORR,
        HttpStatusCode.UNAUTHORIZED
      );
    }
    const booking = await Booking.find({user:user.id});
    if(booking.length > 0){
      user.bookingHistory = booking;
    }
    return user;
  }

  public async loginViaGoogle(loginReq: any) {
    const user = await User.findOne({
      email: loginReq.email,
    });
    let newUser = new User(user);

    if(!user){
      //add user to DB
      newUser = new User({
        email: loginReq.email,
        name: loginReq.name,
        phone: 0,
        interestedSports: [],
      });

      newUser = await newUser.save();
    }

    const booking = await Booking.find({user:newUser.id});    
    newUser.bookingHistory = booking;
    return newUser;
  }

  async getUserList(req: any) {
    let users: UserModel[] = [];
    if(req?.page && req.limit){
      users = await User.find({}).skip((+req.page - 1) * req.limit).limit(req.limit);
    }else{
      users = await User.find({});
    }
    return users.map((user) => new UserDto(user));
  }

public async sendOtp(req: any) {
    let user = await User.findOne({
      email: req.email,
    });

    if (!user) {
      throw new AppErrorDto(AdminError.USER_NOT_EXISTS);
    }
    
    const otp = randomAlphaNumeric(8, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    // <img src="company_logo.png" alt="Company Logo" class="logo">
    // const link = `http://playzo33.in/${req.email}`;
    // const link = `http://localhost:3000/${req.email}`;
    // MailUtils.sendMail({
    //     to: req.email,
    //        subject: "OTP verification" ,
    //     html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Password Reset OTP</title>
//   <link
//     rel="stylesheet"
//     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
//   />
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       background-color: #F4F4F4;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       max-width: 600px;
//       margin: 20px auto;
//       background-color: #fff;
//       border-radius: 5px;
//       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     }
//     h1 {
//       color: white;
//       text-align: center;
//       background-color: #007BFF;
//       padding: 20px;
//     }
//     p {
//       margin-bottom: 20px;
//       font-size: 15px;
//     }
//     .otp {
//       font-size: 24px;
//       font-weight: bold;
//       text-align: center;
//       color: white;
//       margin-bottom: 10px;
//       max-width: 200px;
//       background-color: #007BFF;
//       /* margin: auto; */
//       margin-left: 20px;
//     }
//     .footer {
//       /* text-align: center; */
//       margin-top: 20px;
//       color: #888;
//       padding: 0 20px;
//     }
//     .logo {
//       display: block;
//       margin: 0 auto;
//       max-width: 200px;
//     }
//     .redirect-link {
//       margin-top: 30px;
//       padding: 0 20px;
//       font-size: 15px;
//     }
//     .redirect-link a {
//       color: #007BFF;
//       text-decoration: none;
//       font-weight: bold;
//     }
//     .redirect-link a:hover {
//       text-decoration: underline;
//     }
//     .fa {
//       padding: 7px;
//       font-size: 20px;
//       width: 15px;
//       border-radius: 30px;
//       text-align: center;
//       text-decoration: none;
//       margin: 5px 2px;
//     }
//     .fa-facebook {
//       background: white;
//       color: #007BFF;
//     }
//     .fa-instagram {
//       background: white;
//       color: #007BFF;
//     }
//     .fa-youtube {
//       background: white;
//       color: #007BFF;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <h1>Please reset your Password</h1>
//     <div style="padding: 10px 20px">
//       <p>Hello,</p>
//       <p>
//         We have send you this email in response to your request to reset your
//         password on playzo33
//       </p>
//       <p>Please use this verification code:</p>
//     </div>
//     <div class="otp">${otp}</div>
//     <div class="redirect-link">
//       Click here for OTP verification:
//       <a href="${link}">http://playzo33.in/verify</a>
//     </div>
//     <p style="font-size: 12px; color: darkgray; padding: 0 20px">
//       Please ignore this email if you did not requested a password change
//     </p>
//     <div
//       style="
//         background: #007BFF;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//       "
//     >
//       <p style="padding: 20px; font-size: 12px; color: #fff">
//         Contact, <br />
//         39/6 KCP Thottam, Kumalan Kuttai, Erode,
//         <br />Tamil Nadu - 638011 <br />
//         +91 70944 60944
//         <br />
//         +91 91088 83555
//       </p>
//       <div style="padding: 0 20px">
//         <div style="display: flex; justify-content: flex-end; gap: 8px">
//           <a
//             href="https://www.facebook.com/PlayZo33"
//             class="fa fa-facebook"
//           ></a>
//           <a
//             href="https://www.instagram.com/playzo_33/"
//             class="fa fa-instagram"
//           ></a>
//           <a
//             href="https://www.instagram.com/playzo_33/"
//             class="fa fa-youtube"
//           ></a>
//         </div>
//         <p style="color: white; font-size: 12px">
//           Copyright © 2024 Playzo33 | All Rights Reserved
//         </p>
//       </div>
//     </div>
//   </div>
// </body>
// </html>
        
    //   `
  
    //   });

      user.otp = otp;
      user.expireTime = new Date();
      user = await user.save();
    return user;
  }

  public async otpVerification(email: string, otp:string) {
    const user = await User.find({email:email,otp:otp});
    if (!user[0]) {
      throw new AppErrorDto(AdminError.USER_NOT_EXISTS);
    }
   const time = moment(user[0].expireTime).add(1, "hours");
    if(!time.isSameOrAfter(moment(),"minutes")){
      throw new AppErrorDto(AdminError.EXPIRE_TIME);
    }
    return user[0];
  }
  async findById(id: string) {
    const user = await User.findOne({ _id:id });
    if (!user) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    return user;
  }
  async forgotPassword(id: string, request: PasswordRequestDto) {
 let user = await User.findOne({
      email: id,
    });
    if (!user) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    await user.setPassword(request.password);
    user = await user.save();
    return user;
  }
  
}
