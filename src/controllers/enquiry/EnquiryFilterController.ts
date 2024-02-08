import {  Get, JsonController, QueryParams } from "routing-controllers";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";
import EnquiryService from "../../services/enquiry/EnquiryService";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import { Service } from "typedi";

@JsonController("/admin/enquiryFilter")
@Service()
export class EnquiryFilterController {
  constructor(private enquiryService: EnquiryService) {}

  @Get("/filterEnquiry")
  public async filterPage(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.enquiryService.getAllFilter(request);
  }

  @Get("/filterPagination")
  public async getAllBookings(@QueryParams() query: PaginationRequestDto) {
     const bookings = this.enquiryService.getEnquiryFilter(query);
     return bookings;
  }

  @Get("/filterDateEnquiry")
  public async filterDatePAge(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.enquiryService.getAllDateFilter(request);
  }

}
