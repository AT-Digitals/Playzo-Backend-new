import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";

import { AppError } from "../dto/error/AppError";
import { AppErrorDto } from "../dto/error/AppErrorDto";
import { HttpStatusCode } from "../dto/error/HttpStatusCode";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export class DefaultHandler implements ExpressMiddlewareInterface {
  public use(_: Request, res: Response, next: NextFunction): void {
    if (res.headersSent) {
      return next();
    }
    throw new AppErrorDto(AppError.NOT_FOUND, HttpStatusCode.NOT_FOUND);
  }
}
