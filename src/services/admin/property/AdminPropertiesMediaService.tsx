import { AdminError } from "../../../dto/error/AdminError";
import { AdminPropertyDetailedDto } from "../../../dto/admin/property/AdminPropertyDetailedDto";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { Property } from "../../../models/property/Property";
import { PropertyMediaModel } from "../../../models/property/PropertyMediaModel";
import { Service } from "typedi";

@Service()
export class AdminPropertiesMediaService {
  public async addNewImages(id: string, media: PropertyMediaModel[]) {
    let property = await this.findByPropertyId(id);
    property.media = [...property.media, ...media];
    await property.save();
    property = await property.populate("category").execPopulate();

    return new AdminPropertyDetailedDto(property);
  }

  public async deleteMedia(propertyId: string, mediaId: string) {
    let property = await this.findByPropertyId(propertyId);
    const isMediaExist = property.media.some((media) => media.id === mediaId);

    if (!isMediaExist) {
      throw new AppErrorDto(AdminError.MEDIA_ID_DOES_NOT_EXIST);
    }

    //delete the media
    property.media = property.media.filter((media) => media.id !== mediaId);

    await property.save();
    property = await property.populate("category").execPopulate();

    return new AdminPropertyDetailedDto(property);
  }

  private async findByPropertyId(propertyId: string) {
    const property = await Property.findById(propertyId).populate("category");
    if (!property) {
      throw new AppErrorDto(AdminError.PROPERTY_ID_DOES_NOT_EXIST);
    }
    return property;
  }
}
