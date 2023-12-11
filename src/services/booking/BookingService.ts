import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";
import { BookingDto } from "../../dto/Booking/BookingDto";
import { BookingFilterRequestDto } from "../../dto/Booking/BookingFilterRequestDto";
import { BookingModel } from "../../models/booking/BookingModel";
import { BookingRequestDto } from "../../dto/Booking/BookingRequestDto";
import DateUtils from "../../utils/DateUtils";
import { Service } from "typedi";

@Service()
export default class BookingService {

  async create(request: BookingRequestDto) {
 
   const startDate = DateUtils.add(new Date(request.dateOfBooking),0,"day");
   const endDate = DateUtils.add(new Date(startDate),1,"day");
   enum bookingLength {
    "boardGame" = 5,
    "turf" =2,
    "playstaion" =2
  }
      const bookingList = await Booking.find({
        startTime: request.startTime,
        endTime:request.endTime,
        dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) },
        type: request.type
      });
      const type = request.type as string;

      if (bookingList.length >= bookingLength[type as keyof typeof bookingLength]) {
        throw new AppErrorDto(AppError.ALREADY_BOOKED);
      }
      else{
        let booking = new Booking(request);
        booking.dateOfBooking = new Date(request.dateOfBooking);
        booking = await booking.save();
        return booking;
      }
    
  }

  async findById(id: string) {
    const booking = await Booking.findOne({ id });
    if (!booking) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    return booking;

  }

  public async getAllBookings() {
    const bookings = await Booking.find();
    return bookings.map((booking) => new BookingDto(booking));
  }

  public async filterBookings(request:BookingFilterRequestDto) {
    const startDate = DateUtils.add(new Date(request.dateOfBooking),0,"day");
    const endDate = DateUtils.add(new Date(startDate),1,"day");
    let bookings:BookingModel[] =[];
    bookings = await Booking.find( { "$or": 
    [ 
      { "$and": 
      [
       { dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) }},
        {startTime: request.startTime},
       { type:request.type}
        ] },
        { "$and": 
        [
          {dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) }},
          {startTime: request.startTime},
          ] },
      
      { "$and": 
         [
          {dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) }},
          {startTime: request.startTime},
          {endTime: request.endTime}
           ] },


      { "$and": 
         [ 
          {dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) }},
        {startTime: request.startTime},
        {endTime: request.endTime},
        {type:request.type}
          
          ] }
          
          ] });
     
    return bookings.map((booking) => new BookingDto(booking));
  }

  public async filterDateBookings(request:BookingDateFilterRequestDto) {
    const endDate = DateUtils.add(new Date(request.endDate),1,"day");
     const bookings = await Booking.find( {
        dateOfBooking: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },
    });
     
    return bookings.map((booking) => new BookingDto(booking));
  }

  async updateById(id: string, request: BookingRequestDto) {
    let booking = await Booking.findOne({id});
    if(booking){
    booking.type = request.type;
    booking.cancelDate = request.cancelDate;
    booking.bookingAmount = request.bookingAmount;
    booking.bookingType = request.bookingType;
    booking.deleted = false;
    booking = await booking.save();
    }
    return booking;
  }

  async deleteById(id: string) {
    let booking = await Booking.findOne({id});
    if(booking){
    booking.deleted = true;
    booking = await booking.save();
    }
    return booking;
  }
}
