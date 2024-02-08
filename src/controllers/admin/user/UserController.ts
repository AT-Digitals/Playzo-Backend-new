import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { UserDto } from "../../../dto/user/UserDto";
import { UserRequestDto } from "../../../dto/user/UserRequestDto";
import { UserServices } from "../../../services/user/UserServices";

@JsonController("/admin/user/newUsers")
@Service()
export class UserController {
  constructor(private usersService: UserServices) {}

  @Post("/")
  // @IsAdmin()
  public async createNewAdminUser(@Body() userRequestDto: UserRequestDto) {
    const user = await this.usersService.createUser(userRequestDto);
    return new UserDto(user);
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
