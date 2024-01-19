import {  Get, JsonController, QueryParams } from "routing-controllers";

import { Service } from "typedi";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import EnquiryService from "../../services/enquiry/EnquiryService";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";

@JsonController("/enquiryFilter")
@Service()
export class EnquiryFilterController {
  constructor(private enquiryService: EnquiryService) {}

  @Get("/filterPagination")
  public async getAllBookings(@QueryParams() query: PaginationRequestDto) {
     const bookings = this.enquiryService.getEnquiryFilter(query);
     return bookings;
  }

  @Get("/filterEnquiry")
  public async filterPage(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.enquiryService.getAllFilter(request);
  }

  @Get("/filterDateEnquiry")
  public async filterDatePAge(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.enquiryService.getAllDateFilter(request);
  }

}
