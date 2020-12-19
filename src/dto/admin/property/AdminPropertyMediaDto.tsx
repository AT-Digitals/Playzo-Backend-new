import { PropertyMediaModel, Mediatype } from "../../../models/property/PropertyMediaModel"

export class AdminPropertyMediaDto {
    url: string;
    type: Mediatype

    constructor(property: PropertyMediaModel) {
        this.url = property.url
        this.type = property.type
    }
}