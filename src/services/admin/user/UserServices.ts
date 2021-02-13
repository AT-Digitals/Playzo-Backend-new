import { AdminError } from "../../../dto/error/AdminError";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { Service } from "typedi";
import { User } from "../../../models/user/User";
import { UserDto } from "../../../dto/admin/user/UserDto";
@Service()
export class UsersService {
  public async getAllUsers() {
    const users = await User.find().populate("favouriteProperties");
    return users.map((user) => new UserDto(user));
  }

  public async getUser(userId: string) {
    let user = await User.findById(userId);
    if (!user) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }
    user = await user.populate("favouriteProperties").execPopulate();
    return new UserDto(user);
  }
}
