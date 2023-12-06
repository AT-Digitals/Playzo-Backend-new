export enum AppError {
  AUTHENTICATION_ERORR = "Authentication Failed",
  INPUT_PARAM_ERROR = "Please check your form inputs",
  INTERNAL_ERROR = "Some error in the server. Please contact support",
  ACCESS_DENIED = "Access denied to the request resource",
  NOT_FOUND = "Requested resource not found",
  FAILED_CSRF = "Invalid Request. Please login from site",
  UPLOAD_INVALID_FILE_TYPE = "Invalid file type provided.",
  ALREADY_BOOKED = "Booking closed",
}
