import { ContactedUserDetails } from "../../../models/contactUs/ContactUsModel";

export class ContactedUserDto {
  name: string;
  email: string;
  place: string;
  phone: string;

  constructor(user: ContactedUserDetails) {
    this.name = user.name;
    this.email = user.email;
    this.place = user.place;
    this.phone = user.phone;
  }
}
