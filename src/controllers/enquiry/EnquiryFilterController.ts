import {  Get, JsonController, QueryParams } from "routing-controllers";

import { Service } from "typedi";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import EnquiryService from "../../services/enquiry/EnquiryService";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";

@JsonController("/admin/enquiryFilter")
@Service()
export class EnquiryFilterController {
  constructor(private enquiryService: EnquiryService) {}

  @Get("/filterEnquiry")
  public async filterPage(@QueryParams() request: BookingDateFilterRequestDto) {
    console.log("dkvnjdfkj")
    return this.enquiryService.getAllFilter(request);
  }

  @Get("/filterPagination")
  public async getAllBookings(@QueryParams() query: PaginationRequestDto) {
     const bookings = this.enquiryService.getEnquiryFilter(query);
     return bookings;
  }

  @Get("/filterDateEnquiry")
  public async filterDatePAge(@QueryParams() request: BookingDateFilterRequestDto) {
    console.log("dkvnjdfkj 11")
    return this.enquiryService.getAllDateFilter(request);
  }
  

}
