import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
  Res,
} from "routing-controllers";
import AuthDto from "../../dto/auth/AuthDto";
import { AuthUtils } from "../../utils/AuthUtils";
import { Response } from "express";
import { Service } from "typedi";
import UserLoginRequestDto from "../../dto/auth/UserLoginRequestDto";
import { UserServices } from "../../services/user/UserServices";
import { UserDto } from "../../dto/user/UserDto";

@JsonController("/user")
@Service()
export class UserLoginController {
  constructor(private userService: UserServices) {}

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
    const user = new UserDto(await this.userService.login(request));
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
