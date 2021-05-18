import { PreDefinedSearchModel } from "../../models/preDefinedSearch/PreDefinedSearchModel";
import { PropertyDto } from "./PropertyDto";
import { PropertyModel } from "../../models/property/PropertyModel";
import { elemT } from "../../utils/UnionArray";

export class PreDefinedSearchDto {
  name: string;
  id: string;
  image: string;
  properties: PropertyDto[] = [];

  constructor(preDefinedSearch: PreDefinedSearchModel) {
    this.name = preDefinedSearch.name;
    this.id = preDefinedSearch.id;
    this.image = preDefinedSearch.image;
    this.properties = elemT(
      preDefinedSearch.properties.map(
        (property: PropertyModel) => new PropertyDto(property)
      )
    );
  }
}
