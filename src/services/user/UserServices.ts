import { AdminError } from "../../dto/error/AdminError";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { HttpStatusCode } from "../../dto/error/HttpStatusCode";
import MailUtils from "../../utils/MailUtils";
import PasswordRequestDto from "../../dto/auth/PasswordRequestDto";
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

  async updateById(id: string, request: any) {
    let user = await User.findOne({id});
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
    const link = `http://localhost:8000/user/otpVerification/${req.email}/${otp}`;
   await MailUtils.sendMail({
        to: req.email,
           subject: "OTP verification" ,
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
              
</style>
           </head>
           <body>
           
           <div class="container">
     
          <h1>OTP for account verification is " ${otp} "</h1>
        
          <a href="${link}">Click here</a>
       
      </div>
      </body>
      </html>
      `
  
      });

      user.otp = otp;
      user.expireTime = new Date();
      user = await user.save();
    return user;
  }

  public async otpVerification(email: string, otp:string) {
    const user = await User.find({email:email,otp:otp});
    if (!user[0]) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
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
