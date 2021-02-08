import { AdminError } from "../../dto/error/AdminError";
import { AdminUser } from "../../models/admin/AdminUser";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/anonymous/UserDto";
import { UserRequestDto } from "../../dto/anonymous/UserRequestDto";

@Service()
export class AuthService {
  public async createUser(userDto: UserRequestDto) {
    const existingUser = await User.findOne({
      $or: [{ phoneNumber: userDto.phoneNumber }, { email: userDto.email }],
    });
    if (existingUser) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }
    let user = new User({ ...userDto, isVerified: false });

    user = await user.save();

    return new UserDto(user);
  }

  public async verifyUser(userId: string) {
    let user = await User.findById(userId);

    if (!user) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }

    user.isVerified = true;
    user = await user.save();
    return new UserDto(user);
  }
}
