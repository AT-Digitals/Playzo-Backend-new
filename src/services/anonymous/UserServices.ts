import { AddFavouriteDto } from "../../dto/anonymous/UserRequestDto";
import { AdminError } from "../../dto/error/AdminError";
import { AdminPropertiesOverviewService } from "../admin/property/AdminPropertiesOverviewService";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/anonymous/UserDto";

@Service()
export class UserServices {
  constructor(
    private adminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}

  public async addFavourite(addFavouriteRequestDto: AddFavouriteDto) {
    let user = await this.findById(addFavouriteRequestDto.userId);
    const property = await this.adminPropertyOverviewService.findByPropertyId(
      addFavouriteRequestDto.propertyId
    );

    if (addFavouriteRequestDto.toAdd) {
      user.favouriteProperties = [...user.favouriteProperties, property.id];
    } else {
      user.favouriteProperties = user.favouriteProperties.filter(
        (id) => id != property.id
      );
    }

    user = await user.save();

    user = await user.populate("favouriteProperties").execPopulate();

    return new UserDto(user);
  }

  private async findById(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }

    return user;
  }
}
