import { Body, JsonController, Post } from "routing-controllers";
import { SearchRequestDto } from "../../dto/anonymous/SearchRequestDto";
import { SearchServices } from "../../services/anonymous/SearchServices";

@JsonController("/anonymous/search")
export class SearchController {
  constructor(private searchServices: SearchServices) {}

  @Post("/property")
  public async getProperty(@Body() searchRequestDto: SearchRequestDto) {
    return this.searchServices.getProperties(
      searchRequestDto.type,
      searchRequestDto.city,
      searchRequestDto.query
    );
  }
}
