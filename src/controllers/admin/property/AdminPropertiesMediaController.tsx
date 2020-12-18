import {
    Body,
    JsonController,
    Post,
} from "routing-controllers";
import { AdminPropertiesMediaService } from "../../../services/admin/property/AdminPropertiesMediaService";
import { AdminPropertyMediaDto } from "../../../dto/admin/property/AdminPropertyMediaDto";
import { Mediatype, PropertyMediaModel } from "../../../models/property/PropertyMediaModel";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { UploadUtils, UploadedFiles, UploadedImages } from "../../../utils/UploadUtil";

@JsonController("/admins/properties/media")
export class AdminPropertyMediaController {
    constructor(
        private adminPropertiesMediaService: AdminPropertiesMediaService
    ) { }

    @IsAdmin()
    @Post("/images")
    public async addImages(
        @Body() req: AdminPropertyMediaDto,
        @UploadedImages("medias") desktopFile: UploadedFiles
    ) {

        const imageList = UploadUtils.getUploadedUrls(desktopFile);

        const mediaList: PropertyMediaModel[] = [];

        imageList.forEach(ele => {
            const temp: PropertyMediaModel = {
                url: ele,
                type: Mediatype.image
            };
            mediaList.push(temp);
        });

        return this.adminPropertiesMediaService.addNewImages(req, mediaList);

    }
}