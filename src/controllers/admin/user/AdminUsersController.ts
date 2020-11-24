import { Body, Get, JsonController, Post } from "routing-controllers";

import { AdminRequestDto } from "../../../dto/admin/AdminRequestDto";
import { AdminUsersService } from "../../../services/admin/user/AdminUsersService";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/users")
export class AdminAuthController {
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
