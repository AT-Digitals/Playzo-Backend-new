import {
  AddAlternativeNumberDto,
  AddFavouriteDto,
} from "../../dto/anonymous/UserRequestDto";
import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import {
  UploadUtils,
  UploadedFile,
  UploadedImage,
} from "../../utils/UploadUtil";
import { Service } from "typedi";
import { UserServices } from "../../services/anonymous/UserServices";

@JsonController("/anonymous/user")
@Service()
export class UserController {
  constructor(private AnonymousUserServices: UserServices) {}

  @Post("/addFavourite")
  public async addFavourite(@Body() addFavouriteRequestDto: AddFavouriteDto) {
    return this.AnonymousUserServices.addFavourite(addFavouriteRequestDto);
  }

  @Post("/:userId/addAvatar")
  public async addAvatar(
    @Param("userId") userId: string,
    @UploadedImage("medias") desktopFile: UploadedFile
  ) {
    const image = UploadUtils.getUploadedUrl(desktopFile);
    if (image) {
      return this.AnonymousUserServices.addAvatar(userId, image);
    }
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
