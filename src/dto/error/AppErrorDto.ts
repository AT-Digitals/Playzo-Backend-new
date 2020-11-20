import { HttpStatusCode, defaultErrorStatus } from "./HttpStatusCode";

import { AppError } from "./AppError";

export class AppErrorDto extends Error {
  constructor(
    public customMessage: string | AppError,
    public status: HttpStatusCode = defaultErrorStatus,
    public errors?: any
  ) {
    super(customMessage);
  }

  public toJSON() {
    return {
      message: this.customMessage,
      status: this.status,
      errors: this.errors,
    };
  }
}
