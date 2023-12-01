import { Request, Response } from "express";

import { AppError } from "../dto/error/AppError";
import { AppErrorDto } from "../dto/error/AppErrorDto";
import { AuthDto } from "../dto/auth/AuthDto";
import { EnvUtils } from "./EnvUtils";
import jsonwebtoken from "jsonwebtoken";

export class AuthUtils {
  private static COOKIE_NAME = "TOKEN";

  public static saveAuthToken(res: Response, authDto: AuthDto) {
    if (!process.env.SECRET_KEY) {
      throw new AppErrorDto(AppError.INTERNAL_ERROR);
    }
    const token = jsonwebtoken.sign(
      authDto.getTokenObject(),
      process.env.SECRET_KEY
    );
    res.cookie(this.COOKIE_NAME, token, {
      httpOnly: true,
      secure: EnvUtils.isProd(),
      signed: true,
    });
  }

  public static getAuthUser(req: Request) {
    const token = req.signedCookies[this.COOKIE_NAME];
    if (!token) {
      return null;
    }
    if (!process.env.SECRET_KEY) {
      throw new AppErrorDto(AppError.INTERNAL_ERROR);
    }
    let user = null;
    try {
      console.log("token", token)
      user = jsonwebtoken.verify(token, process.env.SECRET_KEY) as AuthDto;
    } catch (error) {
      console.log("Error in decoding the token");
      console.log(error);
      return null;
    }
    return user;
  }

  public static logoutUser(res: Response) {
    res.cookie(this.COOKIE_NAME, "", {
      httpOnly: true,
      secure: EnvUtils.isProd(),
      signed: true,
      maxAge: 0,
    });
  }
}
