import { Body, Get, JsonController, Post } from "routing-controllers";

import { AdminRequestDto } from "../../../dto/user/AdminRequestDto";
import { AdminUsersService } from "../../../services/admin/adminUser/AdminUsersService";
// import { IsAdmin } from "../../../middleware/AuthValidator";
import { Service } from "typedi";
import { AdminDto } from "../../../dto/user/AdminDto";

@JsonController("/admin/adminUsers")
@Service()
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}

  @Post("/")
  // @IsAdmin()
  public async createNewAdminUser(@Body() adminRequestDto: AdminRequestDto) {
   const user = await this.adminUsersService.createAdmin(adminRequestDto);
   return new AdminDto(user);
  }

  @Get("/")
  // @IsAdmin()
  public async getAllAdminUsers() {
    return this.adminUsersService.getAllAdmins();
  }
}
