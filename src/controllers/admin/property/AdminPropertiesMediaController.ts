import { Delete, JsonController, Param, Post } from "routing-controllers";
import {
  Mediatype,
  PropertyMediaModel,
} from "../../../models/property/PropertyMediaModel";
import {
  UploadUtils,
  UploadedFile,
  UploadedFiles,
  UploadedImage,
  UploadedImages,
  UploadedVideos,
} from "../../../utils/UploadUtil";
import { AdminPropertiesMediaService } from "../../../services/admin/property/AdminPropertiesMediaService";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { Service } from "typedi";

@JsonController("/admins/properties/:propertyId/media")
@Service()
export class AdminPropertyMediaController {
  constructor(
    private adminPropertiesMediaService: AdminPropertiesMediaService
  ) {}

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
  @Post("/videos")
  public async addVideos(
    @UploadedVideos("medias") desktopFile: UploadedFiles,
    @Param("propertyId") propertyId: string
  ) {
    const imageList = UploadUtils.getUploadedUrls(desktopFile);

    const mediaList = imageList.map(
      (url): PropertyMediaModel =>
        ({
          url,
          type: Mediatype.video,
        } as PropertyMediaModel)
    );

    return this.adminPropertiesMediaService.addNewImages(propertyId, mediaList);
  }

  @IsAdmin()
  @Post("/paymentTranche")
  public async addPaymentTranche(
    @UploadedImage("medias") desktopFile: UploadedFile,
    @Param("propertyId") propertyId: string
  ) {
    const image = UploadUtils.getUploadedUrl(desktopFile);
    if (image) {
      return this.adminPropertiesMediaService.addPaymentTranche(
        propertyId,
        image
      );
    }
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
