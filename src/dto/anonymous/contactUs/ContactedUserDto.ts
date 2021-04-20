import { ContactedUserDetails } from "../../../models/contactUs/ContactUsModel";
import { PropertyMinDetailDto } from "../PropertyDto";

export class ContactedUserDto {
  name: string;
  email: string;
  place: string;
  phone: string;
  propertyDetail: PropertyMinDetailDto = {} as PropertyMinDetailDto;

  constructor(user: ContactedUserDetails) {
    this.name = user.name;
    this.email = user.email;
    this.place = user.place;
    this.phone = user.phone;
    if (user.propertyId) {
      this.propertyDetail = new PropertyMinDetailDto(user.propertyId);
    }
  }
}
