import "reflect-metadata";

import { useContainer, useExpressServer } from "routing-controllers";

import { Container } from "typedi";
import { CorsOptions } from "cors";
import { DatabaseSeeder } from "./utils/DatabaseSeeder";
import { DefaultHandler } from "./middleware/DefaultHandler";
import { EnvUtils } from "./utils/EnvUtils";
import { ErrorHandler } from "./middleware/ErrorHandler";
import { HttpStatusCode } from "./dto/error/HttpStatusCode";
import JwtMiddleware from "./middleware/JwtMiddleware";
import MongoDatabase from "./utils/MongoDatabase";
import { MorganMiddleware } from "./middleware/MorganMiddleware";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import winston from "winston";

// import AuthValidator from "./middleware/AuthValidator";

















// import { CsrfHandler } from "./middleware/CsrfHandler";

// import csrf from "csurf";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require("body-parser");

dotenv.config({ path: `${path.join(__dirname, "..", ".env")}` });

// Winston configuration
winston.transports.Console.level = EnvUtils.isProd() ? "warn" : "debug";

const { PORT = 3000 } = process.env;

const corsOption: CorsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Morgan configuration
app.use(MorganMiddleware);

// CSRF
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use(JwtMiddleware);

// app.use(
//   csrf({ cookie: { secure: EnvUtils.isProd(), signed: true, httpOnly: true } })
// );

// Uploads
const staticPath = path.join(__dirname, "..", "uploads");
console.log("Uploads Folder:", staticPath);
app.use("/uploads", express.static(staticPath));

useContainer(Container);
useExpressServer(app, {
  cors: corsOption,
  middlewares: [DefaultHandler, ErrorHandler],
  controllers: [path.join(__dirname, "controllers", "**", "*.js")],
  // authorizationChecker: AuthValidator.validate,
  // currentUserChecker: AuthValidator.currentUser,
  defaultErrorHandler: false,
  defaults: {
    undefinedResultCode: HttpStatusCode.NO_CONTENT,
  },
  validation: {
    forbidUnknownValues: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  },
});

app.listen(PORT, async () => {
  console.log(`Server is running http://localhost:${PORT}...`);
  await MongoDatabase.connect();
  await DatabaseSeeder.init();
});
