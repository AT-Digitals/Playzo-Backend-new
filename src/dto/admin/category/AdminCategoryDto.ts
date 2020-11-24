import { CategoryModel } from "../../../models/category/CategoryModel";

export class AdminCategoryDto {
  id: string;
  name: string;
  hidden: boolean;

  constructor(category: CategoryModel) {
    this.id = category.id;
    this.name = category.name;
    this.hidden = category.hidden;
  }
}
