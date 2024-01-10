import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Enquiry } from "../../models/enquiry/Enquiry";
import { EnquiryDto } from "../../dto/enquiry/EnquiryDto";
import { EnquiryModel } from "../../models/enquiry/EnquiryModel";
import { EnquiryRequestDto } from "../../dto/enquiry/EnquiryRequestDto";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import { Service } from "typedi";

@Service()
export default class EnquiryService {

  async create(request: EnquiryRequestDto) {
        let enquiry = new Enquiry(request);
        enquiry = await enquiry.save();
        return enquiry;
    
  }

  async findById(id: string) {
    const enquiry = await Enquiry.findOne({ _id:id });
    if (!enquiry) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    return enquiry;

  }

  public async getAllenquiries() {
    const enquiries = await Enquiry.find({});
    return enquiries.map((enquiry) => new EnquiryDto(enquiry));
  }

  public async getEnquiryFilter(query:PaginationRequestDto) {
    let enquiries: EnquiryModel[] = [];
    if(query && query.page && query.limit){
      enquiries = await Enquiry.find({}).skip((+query.page - 1) * query.limit).limit(query.limit);
    }
    return enquiries.map((enquiry) => new EnquiryDto(enquiry));
  }

  async deleteById(id: string) {
    let enquiry = await this.findById(id);
    enquiry.deleted = true;
    enquiry = await enquiry.save();
    return enquiry;
  }
}
