import { IncomingMessage, ServerResponse } from "http";

import chalk from "chalk";
import morgan from "morgan";

const statusColor = (status: number) =>
  status >= 500
    ? chalk.red(status)
    : status >= 400
    ? chalk.yellow(status)
    : status >= 300
    ? chalk.cyan(status)
    : chalk.green(status);

const padLeft = (str: string, len: number) => {
  return len > str.length
    ? new Array(len - str.length + 1).join(" ") + str
    : str;
};

const padRight = (str: string, len: number) => {
  return len > str.length
    ? str + new Array(len - str.length + 1).join(" ")
    : str;
};

const printResponse = (
  tokens: morgan.TokenIndexer,
  req: IncomingMessage,
  res: ServerResponse
) => {
  const status = +(tokens.status(req, res) || 0);
  return [
    "RESPONSE :",
    padRight(tokens.method(req, res) + " " + tokens.url(req, res), 30),
    statusColor(status),
    padLeft(tokens["response-time"](req, res) || "-", 8),
    "ms -",
    tokens.res(req, res, "content-length") || "-",
  ].join(" ");
};

export const MorganMiddleware = morgan((tokens, req: any, res) => {
  const logLines = [];
  if (process.env.ENV !== "PROD") {
    logLines.push(`REQUEST  : ${JSON.stringify(req.body)}`);
  }
  logLines.push(printResponse(tokens, req, res));
  return logLines.join("\n");
});
