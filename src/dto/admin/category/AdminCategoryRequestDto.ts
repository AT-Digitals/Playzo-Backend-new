import { IsDefined, IsEnum } from "class-validator";

import { CategoryModel } from "../../../models/category/CategoryModel";
import { CategoryType } from "../../../models/category/CategoryType";

export class AdminCategoryRequestDto {
  @IsDefined({ message: "Name is required" })
  name: CategoryModel["name"];

  @IsDefined({ message: "Display name is required" })
  displayName: CategoryModel["displayName"];

  @IsDefined({ message: "Category type is required" })
  @IsEnum(CategoryType, { message: "Please provide a valid category type" })
  categoryType: CategoryModel["categoryType"];

  @IsDefined({ message: "Please set visible/hidden" })
  hidden: CategoryModel["hidden"];
}
