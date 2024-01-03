import { AdminUser } from "../../../models/admin/AdminUser";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { Service } from "typedi";
import UserError from "../../../dto/error/UserError";
import UserLoginRequestDto from "../../../dto/auth/UserLoginRequestDto";

@Service()
export class AdminAuthService {

  private async findUserByEmail(email: string) {
    const user = await AdminUser.findOne({ email });
    if (!user) {
      throw new AppErrorDto(UserError.USER_EMAIL_NOT_FOUND);
    }
    return user;
  }
  public async login(data: UserLoginRequestDto) {
    const user = await this.findUserByEmail(data.email);
    if (!user) {
      throw new AppErrorDto(UserError.USER_NOT_FOUND);
    }

    if (!(await user.validateUser(data.password))) {
      throw new AppErrorDto(UserError.AUTHENTICATION_FAILED);
    }

    return user;
  }
}
