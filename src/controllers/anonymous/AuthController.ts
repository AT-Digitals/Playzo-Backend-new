import { Body, JsonController, Param, Post } from "routing-controllers";

import { AuthService } from "../../services/anonymous/AuthServices";
import { UserRequestDto } from "../../dto/anonymous/UserRequestDto";

@JsonController("/anonymous/auth/users")
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post("/")
  public async createNewAdminUser(@Body() userRequestDto: UserRequestDto) {
    return this.userService.createUser(userRequestDto);
  }

  @Post("/verify/:userId")
  public async verifyUser(@Param("userId") userId: string) {
    return this.userService.verifyUser(userId);
  }
}
