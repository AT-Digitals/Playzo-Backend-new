import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
  Res,
} from "routing-controllers";

import { AuthDto } from "../../dto/auth/AuthDto";
import { AuthUtils } from "../../utils/AuthUtils";
import { Response } from "express";
import { Service } from "typedi";
import { UserServices } from "../../services/user/UserServices";
import { AdminLoginDto } from "../../dto/auth/AdminLoginDto";
import { AdminAuthService } from "../../services/admin/auth/AdminAuthService";

@JsonController("")
@Service()
export class UserController {
  constructor(private userService: UserServices,private authService: AdminAuthService) {}

  @Get("/me")
//   @Authorized()
  public async getLoggedInUser(@CurrentUser() authDto: AuthDto) {
    return this.userService.getUser(authDto.id);
  }

  @Post("/login")
  public async login(@Body() loginDto: AdminLoginDto, @Res() res: Response) {
    const authDto = await this.authService.login(loginDto);
    AuthUtils.saveAuthToken(res, authDto);
    return res.send(authDto);
  }
  
  @Post("/auth/logout")
  public async logoutUser(@Res() res: Response) {
    AuthUtils.logoutUser(res);
    return res.send("");
  }
}
