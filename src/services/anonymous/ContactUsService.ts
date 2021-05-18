import {
  ContactType,
  PropertiesInfo,
} from "../../models/contactUs/ContactUsModel";

import { AdminPropertiesOverviewService } from "../admin/property/AdminPropertiesOverviewService";
import { ContactUs } from "../../models/contactUs/ContactUs";
import { ContactUsRequestDto } from "../../dto/anonymous/contactUs/ContactUsRequestDto";
import { PropertyModel } from "../../models/property/PropertyModel";
import { Service } from "typedi";

@Service()
export class ContactUsService {
  constructor(
    private adminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}

  public async addContact(contactDto: ContactUsRequestDto) {
    //find Document with the given User Id
    let contactUs = await ContactUs.findOne({
      user: contactDto.userId,
      type: contactDto.type,
    });
    let property: PropertyModel;

    //find Property Info only if ContactType is Enquiry
    if (contactDto.type === ContactType.Enquiry && contactDto.propertyId) {
      property = await this.adminPropertyOverviewService.findByPropertyId(
        contactDto.propertyId
      );

      const newProprtiesInfo: PropertiesInfo = {
        property: property.id,
        timeStamp: new Date(),
      };

      if (contactUs) {
        contactUs.propertiesInfo = [
          ...contactUs.propertiesInfo,
          newProprtiesInfo,
        ];
        contactUs.place = contactDto.place;
        contactUs.timeStamp = new Date().toUTCString();
      } else {
        contactUs = new ContactUs({
          type: contactDto.type,
          user: contactDto.userId,
          propertiesInfo: newProprtiesInfo,
          place: contactDto.place,
          timeStamp: new Date().toUTCString(),
        });
      }
    } else {
      //If Contact type is not enquiry
      contactUs = new ContactUs({
        type: contactDto.type,
        user: contactDto.userId,
        place: contactDto.place,
        timeStamp: new Date().toUTCString(),
      });
    }

    contactUs = await contactUs.save();
    contactUs = await contactUs.populate("user").execPopulate();

    return contactUs.type;
  }
}
