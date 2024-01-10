import {  Get, JsonController, QueryParams } from "routing-controllers";

import { Service } from "typedi";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import EnquiryService from "../../services/enquiry/EnquiryService";

@JsonController("/enquiryFilter")
@Service()
export class EnquiryFilterController {
  constructor(private enquiryService: EnquiryService) {}

  @Get("/filterPaging")
  public async getAllBookings(@QueryParams() query: PaginationRequestDto) {
     const bookings = this.enquiryService.getEnquiryFilter(query);
     return bookings;
  }

}
