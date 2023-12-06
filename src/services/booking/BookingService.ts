import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { BookingDto } from "../../dto/Booking/BookingDto";
import { BookingRequestDto } from "../../dto/Booking/BookingRequestDto";
import { BookingType } from "../../models/booking/BookingType";
import { Service } from "typedi";

@Service()
export default class BookingService {

  async create(request: BookingRequestDto) {
    console.log("ffffff");

   const bookingList = await this.getAllBookings();
   if(bookingList.length>0){
    console.log("1st");
    const Bookings = await Booking.find({
        startTime: request.startTime,
        endTime:request.endTime
      });
      console.log("Bookings",Bookings);
      console.log("Bookings.length",Bookings.length);
    console.log(BookingType.Turf);
      const boardGame = Bookings.filter((book) => book.type === BookingType.BoardGame);
      const turf  = Bookings.filter((book) => book.type === BookingType.Turf);
      const playStation  = Bookings.filter((book) => book.type === BookingType.Playstaion);
      console.log("boardGame",boardGame);
      console.log("turf",turf);
      console.log("playStation",playStation);
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
        booking.dateOfBooking = new Date();
        booking = await booking.save();
        return booking;
      }
    }else{
        console.log("2nd");
        let booking = new Booking(request);
        booking.dateOfBooking = new Date();
        booking = await booking.save();
        return booking;
    }
    
  }

  async findById(id: string) {
    const booking = await Booking.findOne({ id });
    return booking;
  }

  public async getAllBookings() {
    const bookings = await Booking.find();
    return bookings.map((booking) => new BookingDto(booking));
  }

  public async filterBookings(date: Date, startTime:number, endTime?:number) {
    const bookings = await Booking.find( {
        $or : [ 
            {endTime: endTime}
        ],
        dateOfBooking: date,
        startTime: startTime        
    });
    return bookings.map((booking) => new BookingDto(booking));
  }

  public async filterwithBookingType(date: Date, bookingType: BookingType, startTime:number, endTime?:number) {
    const bookings = await Booking.find( {
        $or : [ 
            {endTime: endTime}
        ],
        dateOfBooking: date,
        startTime: startTime,
        type:bookingType        
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
