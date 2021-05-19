import { Body, Get, JsonController, Post } from "routing-controllers";

import { AdminRequestDto } from "../../../dto/admin/user/AdminRequestDto";
import { AdminUsersService } from "../../../services/admin/adminUser/AdminUsersService";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/adminUsers")
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}

  @Post("/")
  @IsAdmin()
  public async createNewAdminUser(@Body() adminRequestDto: AdminRequestDto) {
    return this.adminUsersService.createAdmin(adminRequestDto);
  }

  @Get("/")
  @IsAdmin()
  public async getAllAdminUsers() {
    return this.adminUsersService.getAllAdmins();
  }
}
