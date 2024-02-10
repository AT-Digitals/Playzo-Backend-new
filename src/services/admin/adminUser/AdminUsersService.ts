import { AdminDto } from "../../../dto/user/AdminDto";
import { AdminError } from "../../../dto/error/AdminError";
import { AdminRequestDto } from "../../../dto/user/AdminRequestDto";
import { AdminUser } from "../../../models/admin/AdminUser";
import AdminUserModel from "../../../models/admin/AdminUserModel";
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
    return admin;
  }

  public async getAllAdmins() {
    const admins = await AdminUser.find();
    return admins.map((admin) => new AdminDto(admin));
  }

  async getAdminUserList(req: any) {
    let users: AdminUserModel[] = [];
    if(req?.page && req.limit){
      users = await AdminUser.find({}).skip((+req.page - 1) * req.limit).limit(req.limit);
    }else{
      users = await AdminUser.find({});
    }
    return users.map((user) => new AdminDto(user));
  }
}
