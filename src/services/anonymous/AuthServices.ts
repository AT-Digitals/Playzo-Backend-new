import {
  LoginRequestDto,
  UserRequestDto,
} from "../../dto/anonymous/UserRequestDto";

import { AdminError } from "../../dto/error/AdminError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/anonymous/UserDto";
import axios from "axios";

@Service()
export class AuthService {
  public async createUser(userDto: UserRequestDto) {
    const existingUser = await this.isUserExist(
      userDto.phoneNumber,
      userDto.email
    );

    if (existingUser) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }
    let user = new User({
      ...userDto,
      isVerified: false,
      accountCreationTimeStamp: new Date(),
    });

    user = await user.save();
    user = await user.populate("favouriteProperties").execPopulate();
    return new UserDto(user);
  }

  public async sendOTP(mobile: string) {
    const authKey = process.env.MSG91_AUTH_KEY;
    const templateId = process.env.MSG91_TEMPLATE_ID;

    const result = await axios.get(
      `https://api.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${mobile}&authkey=${authKey}`
    );
    return result.data;
  }

  public async verifyOTP(mobile: string, otp: string) {
    const authKey = process.env.MSG91_AUTH_KEY;

    const result = await axios.get(
      `https://api.msg91.com/api/v5/otp/verify?authkey=${authKey}&mobile=${mobile}&otp=${otp}`
    );

    return result.data;
  }

  public async resendOTP(mobile: string) {
    const authKey = process.env.MSG91_AUTH_KEY;
    const result = await axios.get(
      `https://api.msg91.com/api/v5/otp/retry?authkey=${authKey}&retrytype=text&mobile=${mobile}`
    );

    return result.data;
  }

  public async loginUser({
    phoneNumber,
    location,
    deviceInfo,
  }: LoginRequestDto) {
    let user = await User.findOne({ phoneNumber });
    if (user && user.isVerified) {
      //update last login time stamp
      //update user location & Device Info
      user.lastLoginTimeStamp = new Date();
      user.userLocation = location;
      user.userDeviceInfo = deviceInfo;
      user = await user.save();

      user = await user.populate("favouriteProperties").execPopulate();
      return new UserDto(user);
    } else {
      throw new AppErrorDto(AdminError.USER_NOT_VERIFIED);
    }
  }

  private async findById(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppErrorDto(AdminError.USER_NOT_EXISTS);
    }

    return user;
  }

  public async verifyUser(userId: string) {
    let user = await this.findById(userId);

    user.isVerified = true;
    user = await user.save();
    user = await user.populate("favouriteProperties").execPopulate();
    return new UserDto(user);
  }

  public async isUserExist(mobile: string, email: string) {
    const existingUser = await User.findOne({
      $or: [{ phoneNumber: mobile }, { email }],
    });
    if (existingUser) {
      return true;
    }
    return false;
  }

  public async getUser(userId: string) {
    let user = await this.findById(userId);
    user = await user.populate("favouriteProperties").execPopulate();
    return new UserDto(user);
  }

  public async getUserWithPhone(phone: string) {
    const user = await User.findOne({ phoneNumber: phone })
      .populate("favouriteProperties")
      .exec();

    if (!user) {
      throw new AppErrorDto(AdminError.USER_NOT_EXISTS);
    }

    return new UserDto(user);
  }
}
