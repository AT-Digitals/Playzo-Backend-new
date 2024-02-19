import { EnquiryModel } from "../../models/enquiry/EnquiryModel";

export class EnquiryDto {
  id: string;
  userName: string;
  userEmail: string;
  phoneNumber?: number;
  enquiryMessage?: string;
  projectType?:string;
  dateOfEnquiry?:Date;
  deleted: boolean;

  constructor(enquiry: EnquiryModel) {
    this.id = enquiry.id;
    this.userName = enquiry.userName;
    this.userEmail = enquiry.userEmail;
    this.phoneNumber = enquiry.phoneNumber;
    this.enquiryMessage = enquiry.enquiryMessage;
    this.projectType = enquiry.projectType;
    this.dateOfEnquiry = enquiry.dateOfEnquiry;
    this.deleted = enquiry.deleted;
 
  }
}
