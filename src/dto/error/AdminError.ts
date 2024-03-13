export enum AdminError {
  FLOOR_PLAN_DOES_NOT_EXIST = "Floor Plan does not exist with given ID",
  USER_NOT_VERIFIED = "user not verified yet",
  USER_EXISTS = "user exists with the provided credentials",
  USER_NOT_EXISTS = "user not exists with given id",
  ADMIN_EXISTS = "An admin exists with the provided credentials",
  CATEGORY_ID_DOES_NOT_EXIST = "Cannot find a category with the given ID",
  CATEGORY_NAME_ALREADY_EXISTS = "A category with the given name already exists",
  PROPERTY_ID_DOES_NOT_EXIST = "Cannot find a property with the given ID",
  MEDIA_ID_DOES_NOT_EXIST = "Cannot find a media with the given ID",
  SPECIFICATION_CATEGORY_NOT_VALID = "Please provide one of the valid specification category",
  CAROUSEL_IMAGE_NOT_FOUND = "Cannot find a Carousel Image with given ID",
  PROPERTY_DEVELOPER_ID_DOES_NOT_EXIST = "Cannot find a property developer with the given ID",
  PROPERTY_ALREADY_ADDED = "Property is already added to favourite",
  PREDEFINED_ID_DOES_NOT_EXIST = "Cannot find pre defined search with given ID",
  EXPIRE_TIME="Time Expired! Please resend the otp"
}
