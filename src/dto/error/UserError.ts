enum UserError {
  USER_ALREADY_REGISTERED = "This email is already registered. Sign in to your account.",
  USER_NOT_FOUND = "Looks like you don't have an account. Please contact admin.",
  AUTHENTICATION_FAILED = "Login failed. Please try again.",
  USER_EMAIL_NOT_FOUND = "Looks like you don't have an account. Please contact admin.",
  EMAIL_NOT_VERIFIED = "Please verify your email to sign in",
  PASSWORD_EMPTY = "Please fill in all the fields",
  OLD_PASSWORD_INCORRECT = "Current password is incorrect. Please try again",
  PASSWORD_NOT_SAVED = "Please reset password to use account",
}

export default UserError;
