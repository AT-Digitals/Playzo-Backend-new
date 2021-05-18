import { AdminPropertyOverviewDto } from "../property/AdminPropertyOverviewDto";
import { PreDefinedSearchModel } from "../../../models/preDefinedSearch/PreDefinedSearchModel";
import { elemT } from "../../../utils/UnionArray";

export class PreDefinedSearchDto {
  name: string;
  order: number;
  properties: AdminPropertyOverviewDto[] = [];
  id: string;
  image: string;

  constructor(preDefinedSearch: PreDefinedSearchModel) {
    this.name = preDefinedSearch.name;
    this.order = preDefinedSearch.order;
    this.id = preDefinedSearch.id;
    this.properties = elemT(preDefinedSearch.properties).map(
      (property) => new AdminPropertyOverviewDto(property)
    );
    this.image = preDefinedSearch.image;
  }
}
