export enum AppError {
  AUTHENTICATION_ERORR = "Authentication Failed",
  INPUT_PARAM_ERROR = "Please check your form inputs",
  INTERNAL_ERROR = "Some error in the server. Please contact support",
  ACCESS_DENIED = "Access denied to the request resource",
  NOT_FOUND = "Requested resource not found",
  FAILED_CSRF = "Invalid Request. Please login from site",
  UPLOAD_INVALID_FILE_TYPE = "Invalid file type provided.",
  ALREADY_BOOKED = "Please choose another date and slot",
  ALREADY_ADDED = "Amount already added, please update Your amount",
  AMOUNT_ERROR ="The Amount is higher than fixed amount"
}
