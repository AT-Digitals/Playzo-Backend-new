import {
  Mediatype,
  PropertyMediaModel,
} from "/../models/property/PropertyMediaModel";

export class PropertyMediaDto {
  url: string;
  type: Mediatype;
  id?: string;

  constructor(property: PropertyMediaModel) {
    this.url = property.url;
    this.type = property.type;
    this.id = property.id;
  }
}
