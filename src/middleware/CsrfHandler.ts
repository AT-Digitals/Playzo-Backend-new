import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";

import { EnvUtils } from "../utils/EnvUtils";
import { Service } from "typedi";

@Middleware({ type: "before" })
@Service()
export class CsrfHandler implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction): void {
    if (!res.headersSent) {
      res.cookie("CSRF-Token", req.csrfToken(), {
        domain: process.env.COOKIE_DOMAIN,
        sameSite: EnvUtils.isProd() ? "none" : "lax",
        secure: EnvUtils.isProd(),
      });
    }
    return next();
  }
}
