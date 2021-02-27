import { Body, JsonController, Post } from "routing-controllers";
import { ContactUsRequestDto } from "../../dto/anonymous/contactUs/ContactUsRequestDto";
import { ContactUsService } from "../../services/anonymous/ContactUsService";

@JsonController("/anonymous/contactUs")
export class AdminPropertyFloorPlanController {
  constructor(private contactUsService: ContactUsService) {}

  @Post("/")
  public async addContact(@Body() contactUsDto: ContactUsRequestDto) {
    return this.contactUsService.addContact(contactUsDto);
  }
}
