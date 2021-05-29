import {
  AdminContactUsDto,
  AdminContactUsPropInfoDto,
} from "../../../dto/admin/contactUs/AdminContactUsDto";

import { AdminPropertiesOverviewService } from "../property/AdminPropertiesOverviewService";
import { ContactUs } from "../../../models/contactUs/ContactUs";
import { Service } from "typedi";

@Service()
export class ContactUsService {
  constructor(
    private adminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}
  public async getContact() {
    const contacts = await ContactUs.find().populate("user").exec();
    const agentUser: AdminContactUsDto[] = [];

    for (let contact of contacts) {
      contact = contact as any;
      const temp: AdminContactUsDto = {} as AdminContactUsDto;
      temp["type"] = contact.type;
      temp["name"] = contact.user.name;
      temp["email"] = contact.user.email;
      temp["phone"] = contact.user.phoneNumber;
      temp["place"] = contact.place;
      temp["timeStamp"] = Date.parse(contact.timeStamp) / 1000;
      temp["properties"] = [];

      for (const prop of contact.propertiesInfo) {
        const temp1: AdminContactUsPropInfoDto = {} as AdminContactUsPropInfoDto;
        const property = await this.adminPropertyOverviewService.findByPropertyId(
          prop.property
        );
        temp1["property"] = {
          name: property.name,
          city: property.city,
          subLocation: property.subLocation,
          dateString: prop.timeStamp.toLocaleDateString(),
          date: prop.timeStamp,
          timeStamp: Date.parse(prop.timeStamp.toString()) / 1000,
        };

        temp["properties"] = [...temp["properties"], temp1];
      }

      //sort properties in desending based on timeStamp
      temp["properties"] = temp["properties"]
        .sort((a: any, b: any) => a.timeStamp - b.timeStamp)
        .reverse();

      agentUser.push(temp);
    }

    agentUser.sort((a: any, b: any) => a.timeStamp - b.timeStamp).reverse();

    return agentUser;
  }
}
