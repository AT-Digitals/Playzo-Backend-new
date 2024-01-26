import { Body, Get, JsonController, Param, Post } from "routing-controllers";
// import { IsAdmin } from "../../../middleware/AuthValidator";
import { Service } from "typedi";
import { UserRequestDto } from "../../../dto/user/UserRequestDto";
import { UserServices } from "../../../services/user/UserServices";

@JsonController("/admin/admins/userSite/users")
@Service()
export class UsersController {
  constructor(private usersService: UserServices) {}

  @Post("/")
  // @IsAdmin()
  public async createNewAdminUser(@Body() userRequestDto: UserRequestDto) {
    return this.usersService.createUser(userRequestDto);
  }

  @Get("/")
  // @IsAdmin()
  public async getAllAdminUsers() {
    return this.usersService.getAllUsers();
  }

  @Get("/:userId")
  // @IsAdmin()
  public async getUser(@Param("userId") userId: string) {
    return this.usersService.getUser(userId);
  }
}
