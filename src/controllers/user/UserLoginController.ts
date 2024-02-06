import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
  Res,
} from "routing-controllers";
import { AdminAuthService } from "../../services/admin/auth/AdminAuthService";
import { AdminDto } from "../../dto/user/AdminDto";
import AuthDto from "../../dto/auth/AuthDto";
import { AuthUtils } from "../../utils/AuthUtils";
import { Response } from "express";
import { Service } from "typedi";
import UserLoginRequestDto from "../../dto/auth/UserLoginRequestDto";
import { UserServices } from "../../services/user/UserServices";

@JsonController("/admin")
@Service()
export class UserLoginController {
  constructor(private userService: UserServices,private authService: AdminAuthService) {}

  @Get("/me")
  // @Authorized()
  public async getLoggedInUser(@CurrentUser() authDto: AuthDto) {
    return this.userService.getUser(authDto.id);
  }

  @Post("/login")
  public async login(
    @Res() res: Response,
    @Body() request: UserLoginRequestDto
  ) {
    const user = new AdminDto(await this.authService.login(request));
    AuthUtils.saveAuthToken(res, user);
    return res.send(user);
  }
  
  @Post("/auth/logout")
  public async logoutUser(@Res() res: Response) {
    AuthUtils.logoutUser(res);
    return res.send("");
  }
}
