import {
  ContactUsModel,
  ContactedUserDetails,
} from "../../models/contactUs/ContactUsModel";
import { AdminPropertiesOverviewService } from "../admin/property/AdminPropertiesOverviewService";
import { ContactUs } from "../../models/contactUs/ContactUs";
import { ContactUsDto } from "../../dto/anonymous/contactUs/ContactUsDto";
import { ContactUsRequestDto } from "../../dto/anonymous/contactUs/ContactUsRequestDto";
import { Service } from "typedi";

@Service()
export class ContactUsService {
  constructor(
    private adminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}
  public async addContact(contactDto: ContactUsRequestDto) {
    const data: ContactUsModel = {
      type: contactDto.type,
      userDetails: [
        {
          name: contactDto.name,
          email: contactDto.email,
          place: contactDto.place,
          phone: contactDto.phone,
          propertyId: contactDto.propertyId,
        },
      ],
    } as ContactUsModel;

    let contact = await ContactUs.findOne({ type: contactDto.type });

    if (contact) {
      contact.userDetails = [...contact.userDetails, ...data.userDetails];
    } else {
      contact = new ContactUs({ ...data });
    }
    contact = await contact.save();

    const contactedUsers: ContactedUserDetails[] = [];

    for (const user of contact.userDetails) {
      if (user.propertyId) {
        const property = await this.adminPropertyOverviewService.findByPropertyId(
          user.propertyId
        );
        user.propertyId = property;
      }

      const temp: ContactedUserDetails = {} as ContactedUserDetails;
      Object.assign(temp, user);
      contactedUsers.push(temp);
    }

    contact.userDetails = contactedUsers;

    return new ContactUsDto(contact);
  }
}
