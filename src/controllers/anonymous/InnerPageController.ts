import { Body, Get, JsonController, Param, Post } from "routing-controllers";

import { InnerPageServices } from "../../services/anonymous/InnerPageServices";
import { PropertyRequestDto } from "../../dto/anonymous/PropertyRequestDto";
import { Service } from "typedi";

@JsonController("/anonymous/InnerPage")
@Service()
export class InnerPageController {
  constructor(private AnonymousInnerPageServices: InnerPageServices) {}

  @Get("/property/:propertyId")
  public async getProperty(@Param("propertyId") propertyId: string) {
    return this.AnonymousInnerPageServices.getProperty(propertyId);
  }

  @Post("/similarProperties")
  public async getSimilarProperties(
    @Body() propertyRequestDto: PropertyRequestDto
  ) {
    return this.AnonymousInnerPageServices.getSimilarProperties(
      propertyRequestDto
    );
  }
}
