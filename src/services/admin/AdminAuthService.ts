import { AdminDto } from "../../dto/admin/AdminDto";
import { AdminError } from "../../dto/error/AdminError";
import { AdminLoginDto } from "../../dto/admin/AdminLoginDto";
import { AdminRequestDto } from "../../dto/admin/AdminRequestDto";
import { AdminUser } from "../../models/admin/AdminUser";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { HttpStatusCode } from "../../dto/error/HttpStatusCode";
import { Service } from "typedi";

@Service()
export class AdminAuthService {
  public async login(loginDto: AdminLoginDto) {
    const admin = await AdminUser.findOne({
      phoneNumber: loginDto.phoneNumber,
    });
    if (!admin || !(await admin.validateUser(loginDto.password))) {
      throw new AppErrorDto(
        AppError.AUTHENTICATION_ERORR,
        HttpStatusCode.UNAUTHORIZED
      );
    }
    return new AdminDto(admin);
  }

  public async createAdmin(adminDto: AdminRequestDto) {
    const user = await AdminUser.findOne({
      $or: [{ phoneNumber: adminDto.phoneNumber }, { email: adminDto.email }],
    });
    if (user) {
      throw new AppErrorDto(AdminError.ADMIN_EXISTS);
    }
    let admin = new AdminUser(adminDto);
    await admin.setPassword(adminDto.password);
    admin = await admin.save();
  }
}
