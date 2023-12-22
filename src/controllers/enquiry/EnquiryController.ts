import { Service } from "typedi";
import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import EnquiryService from "../../services/enquiry/EnquiryService";
import { EnquiryRequestDto } from "../../dto/enquiry/EnquiryRequestDto";
import { EnquiryDto } from "../../dto/enquiry/EnquiryDto";

@JsonController("/enquiries")
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
