import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";

import { AdminCategoriesService } from "../../../services/admin/category/AdminCategoriesService";
import { AdminCategoryRequestDto } from "../../../dto/admin/category/AdminCategoryRequestDto";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { Service } from "typedi";

@JsonController("/admins/categories")
@Service()
export class AdminCategoriesController {
  constructor(private adminCategoriesService: AdminCategoriesService) {}

  @Get("/")
  @IsAdmin()
  public async getAllCategories() {
    return this.adminCategoriesService.getAllCategories();
  }

  @Post("/")
  @IsAdmin()
  public async addNewCategory(
    @Body() categoryRequestDto: AdminCategoryRequestDto
  ) {
    return this.adminCategoriesService.addNewCategory(categoryRequestDto);
  }

  @Put("/:categoryId")
  public async updateCategory(
    @Param("categoryId") categoryId: string,
    @Body() categoryRequestDto: AdminCategoryRequestDto
  ) {
    return this.adminCategoriesService.updateCategory(
      categoryId,
      categoryRequestDto
    );
  }
}
