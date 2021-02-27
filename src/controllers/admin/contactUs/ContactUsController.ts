import { Get, JsonController } from "routing-controllers";

import { ContactUsService } from "../../../services/admin/contactUs/ContactUsServices";

@JsonController("/admin/contactUs")
export class AdminPropertyFloorPlanController {
  constructor(private adminContactUsServices: ContactUsService) {}

  @Get("/")
  public async getContact() {
    return this.adminContactUsServices.getContact();
  }
}
