import { AdminContactUsDto } from "../../../dto/admin/contactUs/AdminContactUsDto";
import { AdminPropertiesOverviewService } from "../property/AdminPropertiesOverviewService";
import { ContactType } from "../../../models/contactUs/ContactUsModel";
import { ContactUs } from "../../../models/contactUs/ContactUs";
import { Service } from "typedi";

@Service()
export class ContactUsService {
  constructor(
    private adminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}
  public async getContact() {
    const contacts = await ContactUs.find();
    const agents = contacts.filter(
      (contact) => contact.type === ContactType.Agent
    );
    const enquiries = contacts.filter(
      (contact) => contact.type === ContactType.Enquiry
    );
    const sellers = contacts.filter(
      (contact) => contact.type === ContactType.Seller
    );

    const agentUsers: AdminContactUsDto[] = [];
    const enquiriesUsers: AdminContactUsDto[] = [];
    const sellersUsers: AdminContactUsDto[] = [];

    if (agents && agents.length >= 1) {
      const list = agents[0].userDetails;

      for (const user of list) {
        const temp: AdminContactUsDto = {
          type: ContactType.Agent,
          name: user.name,
          email: user.email,
          phone: user.phone,
          place: user.place,
        } as AdminContactUsDto;

        if (user.propertyId) {
          const property = await this.adminPropertyOverviewService.findByPropertyId(
            user.propertyId
          );
          temp["property"] = {
            name: property.name,
            city: property.city,
          };
        }

        agentUsers.push(temp);
      }
    }

    if (enquiries && enquiries.length >= 1) {
      const list = enquiries[0].userDetails;

      for (const user of list) {
        const temp: AdminContactUsDto = {
          type: ContactType.Enquiry,
          name: user.name,
          email: user.email,
          phone: user.phone,
          place: user.place,
        } as AdminContactUsDto;

        if (user.propertyId) {
          const property = await this.adminPropertyOverviewService.findByPropertyId(
            user.propertyId
          );
          temp["property"] = {
            name: property.name,
            city: property.city,
          };
        }

        enquiriesUsers.push(temp);
      }
    }

    if (sellers && sellers.length >= 1) {
      const list = sellers[0].userDetails;

      for (const user of list) {
        const temp: AdminContactUsDto = {
          type: ContactType.Seller,
          name: user.name,
          email: user.email,
          phone: user.phone,
          place: user.place,
        } as AdminContactUsDto;

        if (user.propertyId) {
          const property = await this.adminPropertyOverviewService.findByPropertyId(
            user.propertyId
          );
          temp["property"] = {
            name: property.name,
            city: property.city,
          };
        }

        sellersUsers.push(temp);
      }
    }

    const allUsers: AdminContactUsDto[] = [
      ...agentUsers,
      ...enquiriesUsers,
      ...sellersUsers,
    ];

    return allUsers;
  }
}
