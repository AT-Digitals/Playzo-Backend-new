import { CategoryModel } from "../../../models/category/CategoryModel";
import { CategoryType } from "../../../models/category/CategoryType";

export class AdminCategoryDto {
  id: string;
  name: string;
  displayName: string;
  categoryType: CategoryType;
  hidden: boolean;

  constructor(category: CategoryModel) {
    this.id = category.id;
    this.name = category.name;
    this.displayName = category.displayName;
    this.categoryType = category.categoryType;
    this.hidden = category.hidden;
  }
}
