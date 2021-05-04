import {
  LoginRequestDto,
  UserRequestDto,
} from "../../dto/anonymous/UserRequestDto";

import { AdminError } from "../../dto/error/AdminError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/anonymous/UserDto";

@Service()
export class AuthService {
  public async createUser(userDto: UserRequestDto) {
    const existingUser = await User.findOne({
      $or: [{ phoneNumber: userDto.phoneNumber }, { email: userDto.email }],
    });
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
      throw new AppErrorDto(AdminError.USER_EXISTS);
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

  public async getUser(userId: string) {
    let user = await this.findById(userId);
    user = await user.populate("favouriteProperties").execPopulate();
    return new UserDto(user);
  }
}
