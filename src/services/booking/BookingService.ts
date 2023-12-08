import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";
import { BookingDto } from "../../dto/Booking/BookingDto";
import { BookingFilterRequestDto } from "../../dto/Booking/BookingFilterRequestDto";
import { BookingModel } from "../../models/booking/BookingModel";
import { BookingRequestDto } from "../../dto/Booking/BookingRequestDto";
import { BookingType } from "../../models/booking/BookingType";
import DateUtils from "../../utils/DateUtils";
import { Service } from "typedi";

@Service()
export default class BookingService {

  async create(request: BookingRequestDto) {
   const bookingList = await this.getAllBookings();
   if(bookingList.length>0){
    const Bookings = await Booking.find({
        startTime: request.startTime,
        endTime:request.endTime
      });
      const boardGame = Bookings.filter((book) => book.type === BookingType.BoardGame);
      const turf  = Bookings.filter((book) => book.type === BookingType.Turf);
      const playStation  = Bookings.filter((book) => book.type === BookingType.Playstaion);
      if (Bookings.length > 0 && boardGame.length === 5) {
        throw new AppErrorDto(AppError.ALREADY_BOOKED);
      }
      else if (Bookings.length > 0 && turf.length === 2) {
        throw new AppErrorDto(AppError.ALREADY_BOOKED);
      }
      else if (Bookings.length > 0 && playStation.length === 2) {
        throw new AppErrorDto(AppError.ALREADY_BOOKED);
      }else{
        let booking = new Booking(request);
        booking.dateOfBooking = new Date(request.dateOfBooking);
        booking = await booking.save();
        return booking;
      }
    }else{
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
    
    if(request.endTime && !request.type){
      bookings = await Booking.find( {
         dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) },
         startTime: request.startTime,
         endTime: request.endTime       
     });
    }
    if(request.endTime && request.type){
      bookings = await Booking.find( {
        dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) },
        startTime: request.startTime,
        endTime: request.endTime,
        type:request.type       
    });
    }

    if(!request.endTime && request.type){
      bookings = await Booking.find( {
        dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) },
        startTime: request.startTime,
        type:request.type       
    });
    }

    if(!request.endTime && !request.type){
      bookings = await Booking.find( {
        dateOfBooking: {"$gte":new Date(startDate),"$lt":new Date(endDate) },
        startTime: request.startTime,
    });
    }
     
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
