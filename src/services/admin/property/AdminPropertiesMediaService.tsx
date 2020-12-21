import { AdminError } from "../../../dto/error/AdminError";
import { AdminPropertyDetailedDto } from "../../../dto/admin/property/AdminPropertyDetailedDto";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { PropertyMediaModel } from "../../../models/property/PropertyMediaModel";
import { AdminPropertiesOverviewService } from "./AdminPropertiesOverviewService"
import { Service } from "typedi";

@Service()
export class AdminPropertiesMediaService {
  constructor(private AdminPropertyOverviewService: AdminPropertiesOverviewService) {

  }

  public async addNewImages(id: string, media: PropertyMediaModel[]) {
    let property = await this.AdminPropertyOverviewService.findByPropertyId(id)
    property.media = [...property.media, ...media];
    await property.save();
    property = await property.populate("category").execPopulate();

    return new AdminPropertyDetailedDto(property);
  }

  public async deleteMedia(propertyId: string, mediaId: string) {
    let property = await this.AdminPropertyOverviewService.findByPropertyId(propertyId);
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
}
