// import {
//   Authorized,
//   CurrentUser,
//   Get,
//   JsonController,
//   Post,
//   Res,
// } from "routing-controllers";

// import { AuthDto } from "../../dto/auth/AuthDto";
// import { AuthUtils } from "../../utils/AuthUtils";
// import { Response } from "express";
// import { Service } from "typedi";
// import { UserService } from "../../services/user/UserService";

// @JsonController("")
// @Service()
// export class UserController {
//   constructor(private userService: UserService) {}

//   @Get("/me")
//   @Authorized()
//   public async getLoggedInUser(@CurrentUser() userDto: AuthDto) {
//     return this.userService.getUser(userDto);
//   }

//   @Post("/auth/logout")
//   public async logoutUser(@Res() res: Response) {
//     AuthUtils.logoutUser(res);
//     return res.send("");
//   }
// }
