import {
  AddAlternativeNumberDto,
  AddFavouriteDto,
} from "../../dto/anonymous/UserRequestDto";
import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { UserServices } from "../../services/anonymous/UserServices";

@JsonController("/anonymous/user")
export class UserController {
  constructor(private AnonymousUserServices: UserServices) {}

  @Post("/addFavourite")
  public async addFavourite(@Body() addFavouriteRequestDto: AddFavouriteDto) {
    return this.AnonymousUserServices.addFavourite(addFavouriteRequestDto);
  }

  @Get("/:userId/shortlistedProperties")
  public async getShortlistedProperties(@Param("userId") userId: string) {
    return this.AnonymousUserServices.getShortlistedProperties(userId);
  }

  @Post("/addAlternativeNumber")
  public async addAlternativeNumber(
    @Body() addNumberDto: AddAlternativeNumberDto
  ) {
    return this.AnonymousUserServices.AddAlternativeNumber(addNumberDto);
  }
}
