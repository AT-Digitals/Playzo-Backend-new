import { Body, JsonController, Post, Res } from "routing-controllers";

import { AdminAuthService } from "../../../services/admin/auth/AdminAuthService";
import { AdminLoginDto } from "../../../dto/admin/auth/AdminLoginDto";
import { AuthUtils } from "../../../utils/AuthUtils";
import { Response } from "express";

@JsonController("/admins")
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}

  @Post("/login")
  public async login(@Body() loginDto: AdminLoginDto, @Res() res: Response) {
    const authDto = await this.authService.login(loginDto);
    AuthUtils.saveAuthToken(res, authDto);
    return res.send(authDto);
  }
}
