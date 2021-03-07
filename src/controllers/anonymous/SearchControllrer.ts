import { Get, JsonController, Param } from "routing-controllers";
import { PropertyType } from "../../models/property/PropertyModel";

import { SearchServices } from "../../services/anonymous/SearchServices";

@JsonController("/anonymous/search")
export class SearchController {
  constructor(private searchServices: SearchServices) {}

  @Get("/property/:type/:city/:query")
  public async getProperty(
    @Param("type") type: PropertyType,
    @Param("city") city: string,
    @Param("query") query: string
  ) {
    return this.searchServices.getProperties(type, city, query);
  }
}
