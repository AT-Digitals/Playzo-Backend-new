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

  @Get("/isUserExist/:mobile/:email")
  public async isUserExist(
    @Param("mobile") mobile: string,
    @Param("email") email: string
  ) {
    return this.userService.isUserExist(mobile, email);
  }

  @Post("/")
  public async createNewAdminUser(@Body() userRequestDto: UserRequestDto) {
    return this.userService.createUser(userRequestDto);
  }

  @Post("/login")
  public async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.userService.loginUser(loginRequestDto);
  }

  @Post("/sendOTP/:mobile")
  public async sendOTP(@Param("mobile") mobile: string) {
    return this.userService.sendOTP(mobile);
  }

  @Post("/verifyOTP/:mobile/:otp")
  public async verifyOTP(
    @Param("mobile") mobile: string,
    @Param("otp") otp: string
  ) {
    return this.userService.verifyOTP(mobile, otp);
  }

  @Post("/resendOTP/:mobile")
  public async resendOTP(@Param("mobile") mobile: string) {
    return this.userService.resendOTP(mobile);
  }

  @Post("/verify/:userId")
  public async verifyUser(@Param("userId") userId: string) {
    return this.userService.verifyUser(userId);
  }
}
