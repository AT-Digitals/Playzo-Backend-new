import {  Delete, Get, JsonController, Param } from "routing-controllers";
import { EnquiryDto } from "../../dto/enquiry/EnquiryDto";
import EnquiryService from "../../services/enquiry/EnquiryService";
import { Service } from "typedi";

@JsonController("/admin/enquiries")
@Service()
export class EnquiryController {
  constructor(private enquiryService: EnquiryService) {}

  @Get("/:enquiryId")
  public async findById(@Param("enquiryId") enquiryId: string) {
    const enquiry =  await this.enquiryService.findById(enquiryId);
    return new EnquiryDto(enquiry);
  }

  @Get()
  public async getAllenquiries() {
     const enquirys = this.enquiryService.getAllenquiries();
     return enquirys;
  }

  @Delete("/:enquiryId")
  public async deleteById(@Param("enquiryId") enquiryId: string) {
    const enquiry = await this.enquiryService.deleteById(enquiryId);
    return new EnquiryDto(enquiry);
  }
}
