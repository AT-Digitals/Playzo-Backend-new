import { Get, JsonController, Param } from "routing-controllers";

import { PreDefinedSearchServices } from "../../services/anonymous/PreDefinedSearchServices";

@JsonController("/anonymous/preDefinedSearch")
export class PreDefinedSearchController {
  constructor(
    private AnonymousPreDefinedSearchServices: PreDefinedSearchServices
  ) {}

  @Get("/:preDefinedSearchId")
  public async getPreDefinedSearch(
    @Param("preDefinedSearchId") preDefinedSearchId: string
  ) {
    return this.AnonymousPreDefinedSearchServices.getPreDefinedSearch(
      preDefinedSearchId
    );
  }

  @Get("/")
  public async getAllPreDefinedSearches() {
    return this.AnonymousPreDefinedSearchServices.getAllPreDefinedSearches();
  }
}
