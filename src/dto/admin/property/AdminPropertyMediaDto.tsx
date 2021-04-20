import {
  Mediatype,
  PropertyMediaModel,
} from "../../../models/property/PropertyMediaModel";

export class AdminPropertyMediaDto {
  url: string;
  imageUrl: string;
  type: Mediatype;
  id?: string;

  constructor(property: PropertyMediaModel) {
    this.url = property.url;
    this.imageUrl = property.imageUrl;
    this.type = property.type;
    this.id = property.id;
  }
}
