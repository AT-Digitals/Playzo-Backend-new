import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { EnquiryDto } from "../../dto/enquiry/EnquiryDto";
import { EnquiryRequestDto } from "../../dto/enquiry/EnquiryRequestDto";
import EnquiryService from "../../services/enquiry/EnquiryService";
import { Service } from "typedi";

@JsonController("/user/enquiries")
@Service()
export class EnquiryController {
  constructor(private enquiryService: EnquiryService) {}

  @Post()
  async create(
    @Body() request: EnquiryRequestDto
  ) {
    const enquiry = await this.enquiryService.create(request);
    return new EnquiryDto(enquiry);
  }

}
