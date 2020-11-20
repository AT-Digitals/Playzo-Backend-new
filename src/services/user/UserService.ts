import { AdminDto } from "../../dto/admin/AdminDto";
import { AdminUser } from "../../models/admin/AdminUser";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { AuthDto } from "../../dto/auth/AuthDto";
import { HttpStatusCode } from "../../dto/error/HttpStatusCode";
import { Service } from "typedi";
import { UserType } from "../../dto/auth/UserType";

@Service()
export class UserService {
  public async getUser(userDto: AuthDto) {
    switch (userDto.userType) {
      case UserType.ADMIN:
        return this.getAdminById(userDto.id);
      default:
        return null;
    }
  }

  private async getAdminById(id: string) {
    const admin = await AdminUser.findById(id);
    if (!admin) {
      throw new AppErrorDto(AppError.ACCESS_DENIED, HttpStatusCode.FORBIDDEN);
    }
    return new AdminDto(admin);
  }
}
