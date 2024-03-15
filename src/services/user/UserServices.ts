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
    //     <html lang="en">
    //     <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Password Reset OTP</title>
    //     <style>
    //       body {
    //         font-family: Arial, sans-serif;
    //         line-height: 1.6;
    //         background-color: #f4f4f4;
    //         margin: 0;
    //         padding: 0;
    //       }
        
    //       .container {
    //         max-width: 600px;
    //         margin: 20px auto;
    //         padding: 20px;
    //         background-color: #fff;
    //         border-radius: 5px;
    //         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //       }
        
    //       h1 {
    //         color: #333;
    //         text-align: center;
    //       }
        
    //       p {
    //         margin-bottom: 20px;
    //       }
        
    //       .otp {
    //         font-size: 24px;
    //         font-weight: bold;
    //         text-align: center;
    //         color: #007bff;
    //         margin-bottom: 30px;
    //       }
        
    //       .footer {
    //         text-align: center;
    //         margin-top: 20px;
    //         color: #888;
    //       }
        
    //       .logo {
    //         display: block;
    //         margin: 0 auto;
    //         max-width: 200px;
    //       }
        
    //       .redirect-link {
    //         text-align: center;
    //         margin-top: 30px;
    //       }
        
    //       .redirect-link a {
    //         color: #007bff;
    //         text-decoration: none;
    //         font-weight: bold;
    //       }
        
    //       .redirect-link a:hover {
    //         text-decoration: underline;
    //       }
    //     </style>
    //     </head>
    //     <body>
        
    //     <div class="container">
          
    //       <h1>Password Reset OTP</h1>
    //       <p>You have requested to reset your password. Please use the following OTP (One-Time Password) to reset your password:</p>
    //       <div class="otp">${otp}</div>
    //       <div class="redirect-link">
    //       <p>If you didn't request this change, please ignore this email.</p>
    //       </div>
    //       <div class="redirect-link">
    //         Click Here for OTP Verification <a href=${link}>http://playzo33.in/verify</a>
    //       </div>
    //       <p class="footer">This email was sent by <a href="http://playzo33.in/">http://playzo33.in/</a></p>
    //     </div>
        
    //     </body>
    //     </html>
        
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
