import {
    JsonController,
    Post,
    Param,
} from "routing-controllers";
import { AdminPropertiesMediaService } from "../../../services/admin/property/AdminPropertiesMediaService";
import { Mediatype, PropertyMediaModel } from "../../../models/property/PropertyMediaModel";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { UploadUtils, UploadedFiles, UploadedImages } from "../../../utils/UploadUtil";

@JsonController("/admins/properties/media")
export class AdminPropertyMediaController {
    constructor(
        private adminPropertiesMediaService: AdminPropertiesMediaService
    ) { }

    @IsAdmin()
    @Post("/images/:propertyId")
    public async addImages(
        @UploadedImages("medias") desktopFile: UploadedFiles,
        @Param("propertyId") propertyId: string
    ) {

        const imageList = UploadUtils.getUploadedUrls(desktopFile);

        let mediaList: PropertyMediaModel[] = [];

        mediaList = imageList.map(ele => {
            const temp: PropertyMediaModel = {
                url: ele,
                type: Mediatype.image
            };
            return temp
        });

        return this.adminPropertiesMediaService.addNewImages(propertyId, mediaList);

    }
}