import {
  AddAlternativeNumberDto,
  AddFavouriteDto,
} from "../../dto/anonymous/UserRequestDto";

import { AdminError } from "../../dto/error/AdminError";
import { AdminPropertiesOverviewService } from "../admin/property/AdminPropertiesOverviewService";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { PropertyDto } from "../../dto/anonymous/PropertyDto";
import { PropertyModel } from "../../models/property/PropertyModel";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserDto } from "../../dto/anonymous/UserDto";
import { elemT } from "../../utils/UnionArray";

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
      //check if property already added to favourite
      if (user.favouriteProperties.includes(property.id)) {
        throw new AppErrorDto(AdminError.PROPERTY_ALREADY_ADDED);
      }

      user.favouriteProperties = [...user.favouriteProperties, property.id];
    } else {
      user.favouriteProperties = user.favouriteProperties.filter(
        // eslint-disable-next-line eqeqeq
        (id) => id != property.id
      );
    }

    user = await user.save();

    user = await user.populate("favouriteProperties").execPopulate();

    return new UserDto(user);
  }

  public async addAvatar(userId: string, avatar: string) {
    let user = await this.findById(userId);
    user.avatar = avatar;
    user = await user.save();
    user = await user.populate("favouriteProperties").execPopulate();
    return new UserDto(user);
  }

  public async AddAlternativeNumber(
    addAlternativeDto: AddAlternativeNumberDto
  ) {
    let user = await this.findById(addAlternativeDto.userId);
    user.alternativeNumber = addAlternativeDto.alternativeNumber;
    user = await user.save();
    user = await user.populate("favouriteProperties").execPopulate();
    return new UserDto(user);
  }

  public async getShortlistedProperties(userId: string) {
    const user = await (await this.findById(userId))
      .populate("favouriteProperties")
      .execPopulate();

    const properties = user.favouriteProperties;

    return elemT(properties).map(
      (property: PropertyModel) => new PropertyDto(property)
    );
  }

  private async findById(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppErrorDto(AdminError.USER_EXISTS);
    }

    return user;
  }
}
