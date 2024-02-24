import { Body, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { AdminDto } from "../../../dto/user/AdminDto";
import { AdminRequestDto } from "../../../dto/user/AdminRequestDto";
import { AdminUsersService } from "../../../services/admin/adminUser/AdminUsersService";
import { Service } from "typedi";
import PasswordRequestDto from "../../../dto/auth/PasswordRequestDto";

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

  @Put("/:userId")
  public async updateById(
    @Param("userId") userId: string,
    @Body() request: PasswordRequestDto
  ) {
    const user = await this.adminUsersService.updateById(userId, request);
    return new AdminDto(user);
  }
}
