import {
    JsonController,
    Post,
    Param,
} from "routing-controllers";
import { AdminPropertiesMediaService } from "../../../services/admin/property/AdminPropertiesMediaService";
import { Mediatype, PropertyMediaModel } from "../../../models/property/PropertyMediaModel";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { UploadUtils, UploadedFiles, UploadedImages } from "../../../utils/UploadUtil";

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

        const mediaList = imageList.map((ele): PropertyMediaModel => ({
            url: ele,
            type: Mediatype.image
        }));

        return this.adminPropertiesMediaService.addNewImages(propertyId, mediaList);

    }
}