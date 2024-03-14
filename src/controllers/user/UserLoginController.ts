import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Res,
} from "routing-controllers";
import AuthDto from "../../dto/auth/AuthDto";
import { AuthUtils } from "../../utils/AuthUtils";
import { OAuth2Client } from "google-auth-library";
import { Response } from "express";
import { Service } from "typedi";
import { UserDto } from "../../dto/user/UserDto";
import UserLoginRequestDto from "../../dto/auth/UserLoginRequestDto";
import { UserRequestDto } from "../../dto/user/UserRequestDto";
import { UserServices } from "../../services/user/UserServices"; 
import { error } from "console";
import PasswordRequestDto from "../../dto/auth/PasswordRequestDto";

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

  @Post("/newUsers")
  public async createNewUser(@Body() userRequestDto: UserRequestDto) {
    const user = await this.userService.createUser(userRequestDto);
    return new UserDto(user);
  }

  @Put("/sendOtp")
  public async createOtp(@Body() email: any) {
    const user = await this.userService.sendOtp(email);
    return new UserDto(user);
  }

  @Get("/otpVerification/:email/:otp")
  public async otpVerification(@Param("email") email: string, @Param("otp") otp: string) {
    const user =  await this.userService.otpVerification(email,otp);
    return new UserDto(user);
  }
  @Put("/:userId")
  public async forgotPassword(
    @Param("userId") userId: string,
    @Body() request: PasswordRequestDto
  ) {
    const user = await this.userService.forgotPassword(userId, request);
    return new UserDto(user);
  }

  @Put("/updatePhone/:userId")
  public async updateById(
    @Param("userId") userId: string,
    @Body() newNumber: any
  ) {
    const user = await this.userService.updateById(userId, newNumber);
    return new UserDto(user);
  }

  @Post("/auth/google")
  public async getGoogleToken(@Body() authBody: any, @Res() res: Response,){
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );
    const {code} = authBody;
    const { tokens } = await oAuth2Client.getToken(code);

    if(tokens.id_token){
      const ticket = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token
      });

      const payload = ticket.getPayload();
      let user: any = await this.userService.loginViaGoogle(payload);
      user = new UserDto(user);    
      const token= AuthUtils.saveAuthToken(res, user);
      user["token"] = token ?? "";
      return user;
    } 
    
    throw error("Not able to get token");
  }
  
}
