import { Get, JsonController } from "routing-controllers";

import { HomePageServices } from "../../services/anonymous/HomePageServices";

@JsonController("/anonymous/homePage")
export class HomePageController {
  constructor(private AnonymousHomePageServices: HomePageServices) {}

  @Get("/carousels")
  public async getAllCarousels() {
    return this.AnonymousHomePageServices.getAllImages();
  }
}
