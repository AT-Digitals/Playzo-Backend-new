import { Get, JsonController, Param } from "routing-controllers";

import { HomePageServices } from "../../services/anonymous/HomePageServices";

@JsonController("/anonymous/homePage")
export class HomePageController {
  constructor(private AnonymousHomePageServices: HomePageServices) {}

  @Get("/carousels")
  public async getAllCarousels() {
    return this.AnonymousHomePageServices.getAllImages();
  }

  @Get("/categories/:categoryId")
  public async getAllItems(@Param("categoryId") categoryId: string) {
    return this.AnonymousHomePageServices.getPropertiesOfCategory(categoryId);
  }
}
