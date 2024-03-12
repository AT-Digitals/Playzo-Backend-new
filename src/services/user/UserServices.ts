import { AdminError } from "../../dto/error/AdminError";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { HttpStatusCode } from "../../dto/error/HttpStatusCode";
import MailUtils from "../../utils/MailUtils";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/user/UserDto";
import UserLoginRequestDto from "../../dto/auth/UserLoginRequestDto";
import { UserModel } from "../../models/user/UserModel";
import { UserRequestDto } from "../../dto/user/UserRequestDto";
import moment from "moment";
import { randomAlphaNumeric } from "../../utils/helpFunc";

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
        phone: 123456789,
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
    const link = `http://localhost:8000/user/otpVerification/${req.email}/${otp}`;
    MailUtils.sendMail({
        to: req.email,
           subject: `OTP for account verification is " ${otp} "` ,
        html: `<!DOCTYPE html>
        <html lang="en">
           <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Send OTP</title>
              <style>
              body {
                width: 100vw;
                background-color: #ddd;
                font-family: sans-serif;
              }
              
              .container {
                height: 100vh;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              
              .form-control {
                display: block;
                width: 300px;
                margin: 10px 0;
                padding: 10px;
                border-radius: 5px;
                border: 2px solid #172432;
              }
              
              button {
                display: inline-block;
                background-color: #172432;
                border: none;
                color: #ddd;
                padding: 10px 20px;
                border-radius: 5px;
              }
              
</style>
           </head>
           <body>
           
           <div class="container">
        <form action="" id="otpForm">
          <h1>OTP Verification</h1>
          <input type="text" id="otp" class="form-control" placeholder="Enter your OTP...">
          <button type="submit">Submit</button>
<a href="${link}">Click here</a>
        </form>
        <style>
        </style>
      </div>
      </body>
      </html>
      `
  
      });

      user.otp = otp;
      user.expireTime = new Date();
      user = await user.save();
    //  await this.otpVerification({email:user.email,otp:otp});
    return {otp:otp,expireTime:new Date()};
  }

  public async otpVerification(email: string, otp:string) {
    const user = await User.find({email:email,otp:otp});
    if (!user[0]) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }
   
    if(!moment(user[0].expireTime).isSameOrAfter(moment(),"minutes")){
      throw new AppErrorDto(AdminError.EXPIRE_TIME);
    }
    console.log(user[0], moment(user[0].expireTime).isSameOrAfter(moment(),"minutes"));
    return user[0];
  }
  
}
