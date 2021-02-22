import { AdminContactUsDto } from "../../../dto/admin/contactUs/AdminContactUsDto";
import { ContactType } from "../../../models/contactUs/ContactUsModel";
import { ContactUs } from "../../../models/contactUs/ContactUs";
import { Service } from "typedi";

@Service()
export class ContactUsService {
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

    let agentUsers: AdminContactUsDto[] = [];
    let enquiriesUsers: AdminContactUsDto[] = [];
    let sellersUsers: AdminContactUsDto[] = [];

    if (agents && agents.length >= 1) {
      agentUsers = agents[0].userDetails.map((user) => ({
        type: ContactType.Agent,
        name: user.name,
        email: user.email,
        phone: user.phone,
        place: user.place,
      }));
    }

    if (enquiries && enquiries.length >= 1) {
      enquiriesUsers = enquiries[0].userDetails.map((user) => ({
        type: ContactType.Enquiry,
        name: user.name,
        email: user.email,
        phone: user.phone,
        place: user.place,
      }));
    }

    if (sellers && sellers.length >= 1) {
      sellersUsers = sellers[0].userDetails.map((user) => ({
        type: ContactType.Seller,
        name: user.name,
        email: user.email,
        phone: user.phone,
        place: user.place,
      }));
    }

    const allUsers: AdminContactUsDto[] = [
      ...agentUsers,
      ...enquiriesUsers,
      ...sellersUsers,
    ];

    return allUsers;
  }
}
