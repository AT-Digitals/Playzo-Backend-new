import { AdminError } from "../../dto/error/AdminError";
import { AdminLoginDto } from "../../dto/auth/AdminLoginDto";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { HttpStatusCode } from "../../dto/error/HttpStatusCode";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/user/UserDto";
import { UserRequestDto } from "../../dto/user/UserRequestDto";

@Service()
export class UserServices {
  public async createUser(UserDto: UserRequestDto) {
    const userEmail = await User.findOne({
      email: UserDto.email
    });
    if (userEmail) {
      throw new AppErrorDto(AdminError.ADMIN_EXISTS);
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

  public async login(loginDto: AdminLoginDto) {
    const user = await User.findOne({
      email: loginDto.email,
    });
    if (!user || !(await user.validateUser(loginDto.password))) {
      throw new AppErrorDto(
        AppError.AUTHENTICATION_ERORR,
        HttpStatusCode.UNAUTHORIZED
      );
    }
    return new UserDto(user);
  }
}
