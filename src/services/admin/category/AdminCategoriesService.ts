import { AdminCategoryDto } from "../../../dto/admin/category/AdminCategoryDto";
import { AdminCategoryRequestDto } from "../../../dto/admin/category/AdminCategoryRequestDto";
import { AdminError } from "../../../dto/error/AdminError";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { Category } from "../../../models/category/Category";
import { Service } from "typedi";

@Service()
export class AdminCategoriesService {
  public async getAllCategories() {
    const categories = await Category.find();
    return categories.map(category => new AdminCategoryDto(category));
  }

  public async addNewCategory(categoryRequest: AdminCategoryRequestDto) {
    this.checkIfCatgoryExistsWithGivenName(categoryRequest.name);
    let category = new Category({ ...categoryRequest });
    category = await category.save();
    return new AdminCategoryDto(category);
  }

  public async updateCategory(
    categoryId: string,
    categoryRequest: AdminCategoryRequestDto
  ) {
    let category = await this.findOneByCategoryId(categoryId);
    if (category.name !== categoryRequest.name) {
      this.checkIfCatgoryExistsWithGivenName(categoryRequest.name);
    }
    category.name = categoryRequest.name;
    category.hidden = categoryRequest.hidden;
    category = await category.save();
    return new AdminCategoryDto(category);
  }

  private async findOneByCategoryId(categoryId: string) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new AppErrorDto(AdminError.CATEGORY_ID_DOES_NOT_EXIST);
    }
    return category;
  }

  private async checkIfCatgoryExistsWithGivenName(name: string) {
    const category = await Category.find({ name });
    if (category) {
      throw new AppErrorDto(AdminError.CATEGORY_NAME_ALREADY_EXISTS);
    }
  }
}
