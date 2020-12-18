import { Service } from "typedi";
import { Property } from "../../../models/property/Property";
import { AdminPropertyMediaDto } from "../../../dto/admin/property/AdminPropertyMediaDto";
import { PropertyMediaModel } from "../../../models/property/PropertyMediaModel";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { AdminError } from "../../../dto/error/AdminError";

@Service()
export class AdminPropertiesMediaService {
    public async addNewImages(
        propertyRequest: AdminPropertyMediaDto,
        media: PropertyMediaModel[]
    ) {

        let property = await this.findByPropertyId(propertyRequest.id);
        let mediaList = property.media
        mediaList = [...mediaList, ...media]
        property.media = mediaList
        await property.save()

        return media.map(ele => ele.url)

    }

    private async findByPropertyId(propertyId: string) {
        const property = await Property.findById(propertyId).populate("category");
        if (!property) {
            throw new AppErrorDto(AdminError.PROPERTY_ID_DOES_NOT_EXIST);
        }
        return property;
    }
}
