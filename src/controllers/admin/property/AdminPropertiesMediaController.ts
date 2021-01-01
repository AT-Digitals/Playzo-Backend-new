import { Delete, JsonController, Param, Post } from "routing-controllers";
import {
  Mediatype,
  PropertyMediaModel,
} from "../../../models/property/PropertyMediaModel";
import {
  UploadUtils,
  UploadedFiles,
  UploadedImages,
} from "../../../utils/UploadUtil";
import { AdminPropertiesMediaService } from "../../../services/admin/property/AdminPropertiesMediaService";
import { IsAdmin } from "../../../middleware/AuthValidator";

@JsonController("/admins/properties/:propertyId/media")
export class AdminPropertyMediaController {
  constructor(
    private adminPropertiesMediaService: AdminPropertiesMediaService
  ) { }

  @IsAdmin()
  @Post("/images")
  public async addImages(
    @UploadedImages("medias") desktopFile: UploadedFiles,
    @Param("propertyId") propertyId: string
  ) {
    const imageList = UploadUtils.getUploadedUrls(desktopFile);

    const mediaList = imageList.map(
      (url): PropertyMediaModel =>
      ({
        url,
        type: Mediatype.image,
      } as PropertyMediaModel)
    );

    return this.adminPropertiesMediaService.addNewImages(propertyId, mediaList);
  }

  @IsAdmin()
  @Delete("/:mediaId")
  public async deleteMedia(
    @Param("propertyId") propertyId: string,
    @Param("mediaId") mediaId: string
  ) {
    return this.adminPropertiesMediaService.deleteMedia(propertyId, mediaId);
  }
}
