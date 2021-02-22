import { ContactUs } from "../../models/contactUs/ContactUs";
import { ContactUsDto } from "../../dto/anonymous/contactUs/ContactUsDto";
import { ContactUsModel } from "../../models/contactUs/ContactUsModel";
import { ContactUsRequestDto } from "../../dto/anonymous/contactUs/ContactUsRequestDto";
import { Service } from "typedi";

@Service()
export class ContactUsService {
  public async addContact(contactDto: ContactUsRequestDto) {
    const data: ContactUsModel = {
      type: contactDto.type,
      userDetails: [
        {
          name: contactDto.name,
          email: contactDto.email,
          place: contactDto.place,
          phone: contactDto.phone,
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
    return new ContactUsDto(contact);
  }
}
