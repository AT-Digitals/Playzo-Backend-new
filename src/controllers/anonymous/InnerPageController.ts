import { Get, JsonController, Param } from "routing-controllers";

import { InnerPageServices } from "../../services/anonymous/InnerPageServices";

@JsonController("/anonymous/InnerPage")
export class InnerPageController {
  constructor(private AnonymousInnerPageServices: InnerPageServices) {}

  @Get("/property/:propertyId")
  public async getProperty(@Param("propertyId") propertyId: string) {
    return this.AnonymousInnerPageServices.getProperty(propertyId);
  }
}
