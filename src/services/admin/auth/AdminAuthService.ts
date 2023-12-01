import { AdminDto } from "../../../dto/user/AdminDto";
import { AdminLoginDto } from "../../../dto/auth/AdminLoginDto";
import { AdminUser } from "../../../models/admin/AdminUser";
import { AppError } from "../../../dto/error/AppError";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { HttpStatusCode } from "../../../dto/error/HttpStatusCode";
import { Service } from "typedi";

@Service()
export class AdminAuthService {
  public async login(loginDto: AdminLoginDto) {
    const admin = await AdminUser.findOne({
      email: loginDto.email,
    });
    if (!admin || !(await admin.validateUser(loginDto.password))) {
      throw new AppErrorDto(
        AppError.AUTHENTICATION_ERORR,
        HttpStatusCode.UNAUTHORIZED
      );
    }
    return new AdminDto(admin);
  }
}
