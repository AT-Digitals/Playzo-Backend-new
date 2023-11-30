import { AdminDto } from "../../../dto/user/AdminDto";
import { AdminError } from "../../../dto/error/AdminError";
import { AdminRequestDto } from "../../../dto/user/AdminRequestDto";
import { AdminUser } from "../../../models/admin/AdminUser";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { Service } from "typedi";

@Service()
export class AdminUsersService {
  public async createAdmin(adminDto: AdminRequestDto) {
    const user = await AdminUser.findOne({
      email: adminDto.email
    });
    if (user) {
      throw new AppErrorDto(AdminError.ADMIN_EXISTS);
    }
    let admin = new AdminUser(adminDto);
    await admin.setPassword(adminDto.password);
    admin = await admin.save();
  }

  public async getAllAdmins() {
    const admins = await AdminUser.find();
    return admins.map((admin) => new AdminDto(admin));
  }
}
