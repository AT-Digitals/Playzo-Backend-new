import { Service } from "typedi";
import { User } from "../../../models/user/User";
import { UserDto } from "../../../dto/admin/user/UserDto";

@Service()
export class UsersService {
  public async getAllUsers() {
    const users = await User.find();
    return users.map((user) => new UserDto(user));
  }
}
