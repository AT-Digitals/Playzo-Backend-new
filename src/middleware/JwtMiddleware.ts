import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const arrayPath = ["/admins/login","/admins/adminUsers"];
  if(arrayPath.includes(req.path) || req.method === "OPTIONS"){
    console.log("coming here...");   
    next();
  }else {
    const authorizationHeader = req.header("Authorization");

    console.log("path...", req.method);

    console.log("authorization Header", authorizationHeader, req.headers);

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid authorization header" });
    }
    const token = authorizationHeader.replace("Bearer ", "");
    console.log("token herere.....", token);
    
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