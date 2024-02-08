import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import DateUtils from "../../utils/DateUtils";
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
        enquiry.dateOfEnquiry = new Date(DateUtils.formatDate(new Date(),"yyyy-MM-DDT00:00:00.000+00:00"));
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

  async getAllFilter(req: any) {
    if(req.startDate){
      req.startDate = DateUtils.formatDate(req.startDate,"yyyy-MM-DDT00:00:00.000+00:00");
     }
     if(req.endDate){
      req.endDate = DateUtils.formatDate(req.endDate,"yyyy-MM-DDT00:00:00.000+00:00");
     }
    const enquiries = await Enquiry.find({"$and": [{dateOfEnquiry : {"$gte":new Date(req.startDate),"$lt":new Date(req.endDate)}}]});
    return enquiries.map((enquiry) => new EnquiryDto(enquiry));
  }

  async getAllDateFilter(req: any) {
    if(req.startDate){
      req.startDate = DateUtils.formatDate(req.startDate,"yyyy-MM-DDT00:00:00.000+00:00");
    }
    if(req.endDate){
    req.endDate = DateUtils.formatDate(req.endDate,"yyyy-MM-DDT00:00:00.000+00:00");
    }
    
    let enquiries: EnquiryModel[] = [];
    if(req?.page && req.limit){  
      enquiries = await Enquiry.find( {"$and": [{dateOfEnquiry : {"$gte":new Date(req.startDate),"$lt":new Date(req.endDate)}}]}).skip((+req.page - 1) * req.limit).limit(req.limit);
    }
    return enquiries.map((enquiry) => new EnquiryDto(enquiry));
  }
}
