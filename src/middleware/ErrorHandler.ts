import {
  BadRequestError,
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import {
  HttpStatusCode,
  defaultErrorStatus,
} from "../dto/error/HttpStatusCode";
import { NextFunction, Response } from "express";

import { AppError } from "../dto/error/AppError";
import { AppErrorDto } from "../dto/error/AppErrorDto";
import { Service } from "typedi";
import { ValidationError } from "class-validator";

@Middleware({ type: "after" })
@Service()
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, _: any, response: Response, next: NextFunction) {
    // In case response is already sent
    if (response.headersSent) {
      return next(error);
    }

    console.log(error);

    if (error instanceof BadRequestError) {
      const validationErrors: ValidationError[] = (error as any).errors;
      // If there is a validation error in the input
      if (validationErrors?.length > 0) {
        this.handleValidationErrors(response, validationErrors);
        return;
      }
    }

    // If an error thrown by app
    if (error instanceof AppErrorDto) {
      response.status(error.status).send(error);
      return;
    }

    if (error.code === "EBADCSRFTOKEN") {
      response
        .status(HttpStatusCode.FORBIDDEN)
        .send(new AppErrorDto(AppError.FAILED_CSRF));
      return;
    }

    // Unknown error
    response
      .status(defaultErrorStatus)
      .send(new AppErrorDto(error?.message || error));
  }

  private handleValidationErrors(
    response: Response,
    errors: ValidationError[]
  ) {
    for (const error of errors) {
      if (error.constraints) {
        for (const constraint in error.constraints) {
          const message = error.constraints[constraint];
          // Return the first constraint violation message
          return response
            .status(defaultErrorStatus)
            .send(new AppErrorDto(message));
        }
      } else if (error.children) {
        this.handleValidationErrors(response, error.children);
        return;
      }
    }

    // Default constraint violation message
    response
      .status(defaultErrorStatus)
      .send(
        new AppErrorDto(AppError.INPUT_PARAM_ERROR, defaultErrorStatus, errors)
      );
  }
}
