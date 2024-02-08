import "reflect-metadata";

import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
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
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import winston from "winston";

// import Razorpay from 'razorpay';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require("body-parser");

dotenv.config({ path: `${path.join(__dirname, "..", ".env")}` });

// Winston configuration
winston.transports.Console.level = EnvUtils.isProd() ? "warn" : "debug";

const { PORT = 3000 } = process.env;

const corsOption = {
  origin: "*",
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["POST", "GET", "PUT"]
};

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cors
app.use(cors(corsOption));

// Morgan configuration
app.use(MorganMiddleware);

// CSRF
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use(JwtMiddleware);

// app.use(
//   csrf({ cookie: { secure: EnvUtils.isProd(), signed: true, httpOnly: true } })
// );

// const instance = new Razorpay({
//   key_id: "rzp_test_mHxfzyhsCG5tZ0",
//   key_secret: "TPX6eMdNAuxM86xdHdtDFvjp",
// });

// app.post("/create/orderId",(req,res)=>{
//   console.log("create oredr request",req.body);
//   const options = {
//     amount: req.body.amount,
//     currency:"INR",
//     receipt:"rcp1"
//   };
//   instance.orders.create(options, function(_err,order){
//     console.log(order);
//     res.send(order);
//   });
// });

// Uploads
const staticPath = path.join(__dirname, "..", "uploads");
console.log("Uploads Folder:", staticPath);
app.use("/uploads", express.static(staticPath));

useContainer(Container);
useExpressServer(app, {
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
