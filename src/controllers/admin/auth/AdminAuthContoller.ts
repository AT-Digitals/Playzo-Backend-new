import { Body, JsonController, Post, Res } from "routing-controllers";

import { AdminAuthService } from "../../../services/admin/auth/AdminAuthService";
import { AdminLoginDto } from "../../../dto/auth/AdminLoginDto";
import { AuthUtils } from "../../../utils/AuthUtils";
import { Response } from "express";
import { Service } from "typedi";
// import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins")
@Service()
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}
  
  // @IsAdmin()
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
