import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import {
  LoginRequestDto,
  UserRequestDto,
} from "../../dto/anonymous/UserRequestDto";
import { AuthService } from "../../services/anonymous/AuthServices";

@JsonController("/anonymous/auth/users")
export class AuthController {
  constructor(private userService: AuthService) {}

  @Get("/:userId")
  public async getUser(@Param("userId") userId: string) {
    return this.userService.getUser(userId);
  }

  @Post("/")
  public async createNewAdminUser(@Body() userRequestDto: UserRequestDto) {
    return this.userService.createUser(userRequestDto);
  }

  @Post("/login")
  public async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.userService.loginUser(loginRequestDto.phoneNumber);
  }

  @Post("/verify/:userId")
  public async verifyUser(@Param("userId") userId: string) {
    return this.userService.verifyUser(userId);
  }
}
