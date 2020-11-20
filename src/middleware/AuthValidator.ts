import { Action, Authorized } from "routing-controllers";

import { AppError } from "../dto/error/AppError";
import { AppErrorDto } from "../dto/error/AppErrorDto";
import { AuthUtils } from "../utils/AuthUtils";
import { AuthorizationChecker } from "routing-controllers/AuthorizationChecker";
import { CurrentUserChecker } from "routing-controllers/CurrentUserChecker";
import { HttpStatusCode } from "../dto/error/HttpStatusCode";
import { UserType } from "../dto/auth/UserType";

export class AuthValidator {
  static validate: AuthorizationChecker = (action: Action, roles: string[]) => {
    const user = AuthUtils.getAuthUser(action.request);
    if (user && !roles.length) {
      return true;
    }
    if (user && roles.find((role) => role === user.userType)) {
      return true;
    }
    throw new AppErrorDto(AppError.ACCESS_DENIED, HttpStatusCode.FORBIDDEN);
  };

  static currentUser: CurrentUserChecker = (action: Action) => {
    const user = AuthUtils.getAuthUser(action.request);
    if (!user) {
      throw new AppErrorDto(AppError.ACCESS_DENIED, HttpStatusCode.FORBIDDEN);
    }
    return user;
  };
}

export const IsAdmin = () => Authorized(UserType.ADMIN);
export const IsUser = () => Authorized([UserType.ADMIN, UserType.USER]);
