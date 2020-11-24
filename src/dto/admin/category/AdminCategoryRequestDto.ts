import { IsDefined } from "class-validator";

export class AdminCategoryRequestDto {
  @IsDefined({ message: "Name is required" })
  name: string;

  @IsDefined({ message: "Please set visible/hidden" })
  hidden: boolean;
}
