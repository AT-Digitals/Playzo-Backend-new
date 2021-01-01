import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";

import { EnvUtils } from "../utils/EnvUtils";

@Middleware({ type: "before" })
export class CsrfHandler implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction): void {
    if (!res.headersSent) {
      res.cookie("CSRF-Token", req.csrfToken(), {
        domain: process.env.COOKIE_DOMAIN,
        secure: EnvUtils.isProd(),
      });
    }
    return next();
  }
}
