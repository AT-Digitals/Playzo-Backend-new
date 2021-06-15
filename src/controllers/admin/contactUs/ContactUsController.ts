import { Get, JsonController } from "routing-controllers";

import { ContactUsService } from "../../../services/admin/contactUs/ContactUsServices";
import { Service } from "typedi";

@JsonController("/admin/contactUs")
@Service()
export class AdminPropertyFloorPlanController {
  constructor(private adminContactUsServices: ContactUsService) {}

  @Get("/")
  public async getContact() {
    return this.adminContactUsServices.getContact();
  }
}
