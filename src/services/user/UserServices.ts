import { AdminError } from "../../dto/error/AdminError";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { HttpStatusCode } from "../../dto/error/HttpStatusCode";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/user/UserDto";
import UserLoginRequestDto from "../../dto/auth/UserLoginRequestDto";
import { UserModel } from "../../models/user/UserModel";
import { UserRequestDto } from "../../dto/user/UserRequestDto";

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
  
}
