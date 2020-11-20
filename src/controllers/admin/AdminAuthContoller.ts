import { Body, JsonController, Post, Res } from "routing-controllers";

import { AdminAuthService } from "../../services/admin/AdminAuthService";
import { AdminLoginDto } from "../../dto/admin/AdminLoginDto";
import { AdminRequestDto } from "../../dto/admin/AdminRequestDto";
import { AuthUtils } from "../../utils/AuthUtils";
import { IsAdmin } from "../../middleware/AuthValidator";
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

  @Post("/")
  @IsAdmin()
  public async createAdmin(@Body() adminDto: AdminRequestDto) {
    await this.authService.createAdmin(adminDto);
  }
}
