import { Get, JsonController, Param } from "routing-controllers";

import { IsAdmin } from "../../../middleware/AuthValidator";
import { UsersService } from "../../../services/admin/user/UserServices";

@JsonController("/admins/userSite/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/")
  @IsAdmin()
  public async getAllAdminUsers() {
    return this.usersService.getAllUsers();
  }

  @Get("/:userId")
  @IsAdmin()
  public async getUser(@Param("userId") userId: string) {
    return this.usersService.getUser(userId);
  }
}
