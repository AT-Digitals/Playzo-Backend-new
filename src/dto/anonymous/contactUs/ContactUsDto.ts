import {
  ContactType,
  ContactUsModel,
} from "../../../models/contactUs/ContactUsModel";

import { ContactedUserDto } from "./ContactedUserDto";

export class ContactUsDto {
  type: ContactType;
  userDetails: ContactedUserDto[];

  constructor(contact: ContactUsModel) {
    this.type = contact.type;
    this.userDetails = contact.userDetails.map(
      (user) => new ContactedUserDto(user)
    );
  }
}
