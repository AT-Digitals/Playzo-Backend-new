import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

const JwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const arrayPath = ["/admin/admins/login","/admin/admins/adminUsers","/user/login","/user/auth/logout","/user/enquiries"];
  if(arrayPath.includes(req.path) || req.method === "OPTIONS"){
    next();
  }else {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid authorization header" });
    }
    const token = authorizationHeader.replace("Bearer ", "");
    
    if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Authorization token not found" });
      }
      try {
        const decoded = jwt.verify(token, (process.env as any).SECRET_KEY);
        (req as any).user = decoded;
        next();
      
      } catch (error: unknown) {
        if (error instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ success: false, message: "Unauthorized! Access Token was expired!" });
        }
        if (error instanceof jwt.NotBeforeError) {
          return res.status(401).json({ success: false, message: "jwt not active" });
        }
        if (error instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({ success: false, message: "Invalid token" });
        }
      }
    }
  
};
export default JwtMiddleware;