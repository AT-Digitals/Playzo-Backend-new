import { Service } from "typedi";
import { Property } from "../../../models/property/Property";
import { PropertyMediaModel } from "../../../models/property/PropertyMediaModel";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { AdminPropertyDetailedDto } from "../../../dto/admin/property/AdminPropertyDetailedDto";
import { AdminError } from "../../../dto/error/AdminError";

@Service()
export class AdminPropertiesMediaService {
    public async addNewImages(
        id: string,
        media: PropertyMediaModel[]
    ) {

        let property = await this.findByPropertyId(id);
        property.media = [...property.media, ...media]
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
