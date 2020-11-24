import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

import { AdminError } from "../dto/error/AdminError";
import { Category } from "../models/category/Category";

@ValidatorConstraint({ name: "isValidCategory", async: true })
export class IsValidCategory implements ValidatorConstraintInterface {
  async validate(categoryId: string): Promise<boolean> {
    if (!categoryId) {
      return false;
    }
    const category = await Category.findById(categoryId);
    return !!category;
  }

  defaultMessage(): string {
    return AdminError.CATEGORY_ID_DOES_NOT_EXIST;
  }
}
