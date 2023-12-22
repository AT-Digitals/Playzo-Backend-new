import { Body, JsonController, Post, Res } from "routing-controllers";

import { AdminAuthService } from "../../../services/admin/auth/AdminAuthService";
import { AuthUtils } from "../../../utils/AuthUtils";
import { Response } from "express";
import { Service } from "typedi";
import UserLoginRequestDto from "../../../dto/auth/UserLoginRequestDto";
import { AdminDto } from "../../../dto/user/AdminDto";

@JsonController("/admins")
@Service()
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}
  
  @Post("/login")
  public async login(
    @Res() res: Response,
    @Body() request: UserLoginRequestDto
  ) {
    const user = new AdminDto(await this.authService.login(request));
   const token= AuthUtils.saveAuthToken(res, user);
    user["token"] = token??"";
    return res.send(user);
  }

  @Post("/auth/logout")
  public async logoutUser(@Res() res: Response) {
    AuthUtils.logoutUser(res);
    return res.send("");
  }
}
