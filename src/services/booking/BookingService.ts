import { AdminUser } from "../../models/admin/AdminUser";
import { Amount } from "../../models/amount/Amount";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { BookedRequestDto } from "../../dto/booking/BookedRequestDto";
import { Booking } from "../../models/booking/Booking";
import { BookingAmountRequestDto } from "../../dto/booking/BookingAmountRequestDto";
import { BookingDateFilterRequestDto } from "../../dto/booking/BookingDateFilterRequestDto";
import { BookingDto } from "../../dto/booking/BookingDto";
import { BookingModel } from "../../models/booking/BookingModel";
import { BookingRequestDto } from "../../dto/booking/BookingRequestDto";
import { BookingType } from "../../models/booking/BookingType";
import DateUtils from "../../utils/DateUtils";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import { Service } from "typedi";
import { User } from "../../models/user/User";
import { UserBookingType } from "../../models/booking/UserBookingType";
import { filterBookingList } from "../../utils/helpFunc";
import moment from "moment";

// import MailTemplateUtils from "../../utils/MailTemplateUtils";
// import MailUtils from "../../utils/MailUtils";

@Service()
export default class BookingService {
  async create(request: BookingRequestDto, isAdmin = false) {
    const endDate = DateUtils.add(new Date(request.endDate),1,"day");
    const diffDuration = moment.duration(moment(request.endDate).diff(moment(request.startDate)));
    const days = moment(endDate).diff(moment(request.startDate),"days");
    const bookingQuery =  {
      $and: [
        {startTime: {
          $lt: request.endTime
        }},
        {endTime: {
          $gt: request.startTime
        }},
        {type: request.type},
        {isRefund: false}
      ],
    };
    const bookingList = await Booking.find(bookingQuery);
      
    const filteredBookingList = filterBookingList(bookingList, request.startDate,request.endDate, request.startTime, request.endTime, days);

    //check for combinedSlots
    if(this.checkForCombinedSlots(filteredBookingList, request)){
      throw new AppErrorDto(AppError.ALREADY_BOOKED);
    }

    const courtFilteredList = this.filterBasedCourt(filteredBookingList, request.court);

    if (courtFilteredList.length >= 1) {
      throw new AppErrorDto(AppError.ALREADY_BOOKED);
    }
    
    const bookingData: any = {
      ...request,
      admin: request.user
    };

    delete bookingData[isAdmin ? "user" : "admin"];
    let booking = new Booking(bookingData);

    if(request.user){
      const adminUser = await AdminUser.find({_id:request.user}) ?? [];
      const users = await User.find({_id: request.user}) ?? [];
      if(adminUser.length === 0 && users.length === 0){
        throw new AppErrorDto("User not found"); 
      }
    }
    
    booking.dateOfBooking = new Date();
    booking.isRefund = false;
    booking.userBookingType = request.userBookingType;
    booking.court = request.court;

    if(request.bookingId !== ""){
      booking.bookingId = request.bookingId;
    }

    booking.isAnnual = diffDuration.years() > 0;
    booking.duration = days;
    
    //Amount Calculations
    const {totalAmount, onlineAmount} = await this.getAmount(request, days);

    if(request.userBookingType === UserBookingType.Online){
      booking.bookingAmount = {
        online : onlineAmount, 
        cash: 0,
        total: onlineAmount,
        refund:0
      };
    }else{
      const onlineValue =request.bookingAmount?.online?request.bookingAmount?.online:0;
      if(onlineValue<=totalAmount){
        booking.bookingAmount = {
          online : onlineValue,
          cash: 0,
          total: onlineValue,
          refund:0
        };
      }else{
        throw new AppErrorDto(AppError.AMOUNT_ERROR); 
      }
    }
    booking.deleted = false;
    booking = await booking.save();
      // MailUtils.sendMail({
      //   to: "antoshoba@gmail.com",
      //   subject: "Your booking successfully added",
      //   html: MailTemplateUtils.BookingMail(booking)
  
      // });
    return booking;
  }

  checkForCombinedSlots(bookingList: any, request: any) {
    if(request.type === "turf" || request.type === "playstation"){
      if(request.court === "3"){
        return bookingList.length !== 0;
      }else {
        let isCombinedBooked = false;
        for (let i = 0; i < bookingList.length; i++) {
          const booking = bookingList[i];
          if(booking.court === "3"){
            isCombinedBooked = true;
            break;
          }
        }
        return isCombinedBooked;
      }
    }
    return false;
  }

  filterBasedCourt(bookingList: any, court: string){
    const filteredBookingList = [];
    for (let i = 0; i < bookingList.length; i++) {
      const booking = bookingList[i];
      if(booking.court === court){
        filteredBookingList.push(booking);
      }
    }
    return filteredBookingList;
  }
  
  async getBookedList(request: BookedRequestDto) {
    const endDate = DateUtils.add(new Date(request.endDate),1,"day");
    const days = moment(endDate).diff(moment(request.startDate),"days");
    const bookingData = {
      $and: [
        {startTime: {
          $lt: request.endTime
        }},
        {endTime: {
          $gt: request.startTime
        }},
        {type: request.type},
        {isRefund: false}
      ],
    };
    const bookingList = await Booking.find(bookingData);
    const filteredBookingList = filterBookingList(bookingList, request.startDate,request.endDate, request.startTime, request.endTime, days);

    if (this.filterBasedCourt(filteredBookingList, request.court).length >= 1 || this.checkForCombinedSlots(filteredBookingList, request)) {
      throw new AppErrorDto(AppError.ALREADY_BOOKED);
    }

    return bookingList.map((booking) => new BookingDto(booking));
  }

  async getAmount(request: any, days: any) {
    //Amount Calculations
    const amountList = await Amount.find({bookingtype : request.type});
    const amount =  parseInt(amountList[0].bookingAmount.toString());
    const duration = moment.duration(moment(request.endTime).diff(moment(request.startTime)));
    const minutes = parseInt(duration.asMinutes().toString());
    const hours = minutes/60;
    const totalAmount = (days * hours * amount);
    const onlineAmount = totalAmount * (30/100);

    return {
      totalAmount,
      onlineAmount
    };
  }

  async findById(id: string) {
    const booking = await Booking.findOne({ _id:id });
    if (!booking) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    return booking;

  }

  public async getAll() {
    const bookings = await Booking.find({}).populate("user","name email phone userType").populate("admin","name email phone userType").exec();
    return bookings.map((booking) => new BookingDto(booking));
  }

  public async getAllBookings(query:PaginationRequestDto) {
    let bookings: BookingModel[] = [];
    if(query && query.page && query.limit){
      bookings = await Booking.find({}).skip((+query.page - 1) * query.limit).limit(query.limit).populate("user","name email phone userType")
      .populate("admin","name email phone userType").exec();
    }
    return bookings.map((booking) => new BookingDto(booking));
  }

  async updateById(id: string, request: BookingRequestDto) {
    let booking = await Booking.findOne({id});
    if(booking){
    booking.type = request.type;
    booking.cancelDate = request.cancelDate;
    if(request.bookingAmount){
    booking.bookingAmount =
    {
        online : 0, 
        cash: request.bookingAmount.cash,
        total: parseInt(request.bookingAmount.cash.toString()) + 0,
        refund:0
    };
    }
  
    booking.bookingtype = request.bookingtype;
    booking.deleted = false;
    booking = await booking.save();
    }
    return booking;
  }

  async updateAmount(id: string, request: BookingAmountRequestDto) {
    let booking = await this.findById(id);
    const endDate = DateUtils.add(new Date(booking.endDate),1,"day");
    const days = moment(endDate).diff(moment(booking.startDate),"days");
    const {totalAmount} = await this.getAmount(booking, days);

    if(request.bookingAmount && booking.bookingAmount){
     
      if(request.isRefund){
        if(parseInt(booking.bookingAmount.cash.toString())>=parseInt(request.bookingAmount.refund.toString())){
          booking.bookingAmount =
          {
            online : request.bookingAmount.online, 
            cash: parseInt(booking.bookingAmount.cash.toString()) - request.bookingAmount.refund,
            total: parseInt(booking.bookingAmount.online.toString()) + (parseInt(booking.bookingAmount.cash.toString()) - request.bookingAmount.refund),
            refund: parseInt(booking.bookingAmount.refund.toString()) + parseInt(request.bookingAmount.refund.toString())
          };
      
          booking.isRefund = true;
          booking.deleted = false;
        }else{
          throw new AppErrorDto(AppError.AMOUNT_ERROR); 
        }
      }else{
        const cashAmount = parseInt(request.bookingAmount.cash.toString())  + parseInt(booking.bookingAmount.cash.toString());
        const onlineAmount = parseInt(request.bookingAmount.online.toString()) + parseInt(booking.bookingAmount.online.toString());
        const finalAmount = cashAmount+onlineAmount;
        if(finalAmount<=totalAmount){

          booking.bookingAmount =
          {
            online : onlineAmount, 
            cash: cashAmount,
            total: finalAmount,
            refund:parseInt(booking.bookingAmount.refund.toString()) + parseInt(request.bookingAmount.refund.toString())
          };
        }else{
          throw new AppErrorDto(AppError.AMOUNT_ERROR); 
        }
      }
    }
    booking = await booking.save();
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

  async getBookingFilterCount(req: any) {
    if(req.startDate){
      req.startDate = DateUtils.formatDate(req.startDate,"yyyy-MM-DDT00:00:00.000+00:00");
    }
     if(req.endDate){
      req.endDate = DateUtils.formatDate(req.endDate,"yyyy-MM-DDT00:00:00.000+00:00");
    }
    const newFilter = { ...req };
    delete newFilter.page;
    delete newFilter.limit;
    
    if(newFilter.startDate && newFilter.endDate){
      delete newFilter.startDate;
        newFilter.startDate= {
          $gte: new Date(req.startDate)
        };
        newFilter.endDate = {
          $lte: new Date(req.endDate)
        };
    }else{
      if(req.startDate){
        newFilter.startDate= {
          $gte: new Date(req.startDate)
        };
      }
      if(req.endDate){
        newFilter.endDate = {
          $lte: new Date(req.endDate)
        };
      }
    }

    const  bookings = await Booking.find({"$and": [newFilter]}).populate("user","name email phone userType").populate("admin","name email phone userType").exec();
    //between days array filter start
    const dateFilter = {...newFilter};
    delete dateFilter.startDate;
    delete dateFilter.endDate;
    const endDate = DateUtils.add(new Date(req.endDate),1,"day");
    const days = moment(endDate).diff(moment(req.startDate),"days");
    if(req.startDate && req.endDate){
      const betweenBookings = await Booking.find({"$and": [{startDate:{
        $gte: new Date(req.startDate)
      
      }},{startDate:{
        $lte: new Date(req.endDate)
      }},{duration:{ $gt: days}}, dateFilter]}).populate("user","name email phone userType").populate("admin","name email phone userType").exec();
      betweenBookings.map(async (list)=>{
        if(list.bookingAmount?.cash || list.bookingAmount?.online){
          const {totalAmount, onlineAmount}  = await this.setFilterAmount(list,days);
          console.log(totalAmount,onlineAmount);
          list.bookingAmount["cash"] = totalAmount;
          list.bookingAmount["online"] = onlineAmount;
        }
      });

      betweenBookings.map( (list)=>{
        bookings.push(list);
      });
    }
      
    //between days array filter end
    return bookings.map((booking) => new BookingDto(booking));
  }

  async getBookingFilter(req: any) {
    
    if(req.startDate){
      req.startDate = DateUtils.formatDate(req.startDate,"yyyy-MM-DDT00:00:00.000+00:00");
    }
    if(req.endDate){
      req.endDate = DateUtils.formatDate(req.endDate,"yyyy-MM-DDT00:00:00.000+00:00");
    }
    const newFilter = { ...req };
    delete newFilter.page;
    delete newFilter.limit;

    if(newFilter.startDate && newFilter.endDate){
      delete newFilter.startDate;
      newFilter.startDate= {
        $gte: new Date(req.startDate)
      };
      newFilter.endDate = {
        $lte: new Date(req.endDate)
      };
    }else {
      if(req.startDate){
        newFilter.startDate= {
          $gte: new Date(req.startDate)
        };
      }
      if(req.endDate){
        newFilter.endDate = {
          $lte: new Date(req.endDate)
        };
      }
    }

    let bookings: BookingModel[] = [];

    bookings = await Booking.find( {"$and": [newFilter]}).sort({dateOfBooking:-1}).skip((+req.page - 1) * req.limit).limit(req.limit).populate("user","name email phone userType")
    .populate("admin","name email phone userType").exec(); 
    if(req && req.page && req.limit){ 
      //between days array filter start
      const dateFilter = {...newFilter};
      delete dateFilter.startDate;
      delete dateFilter.endDate;
      const endDate = DateUtils.add(new Date(req.endDate),1,"day");
      const days = moment(endDate).diff(moment(req.startDate),"days");
      if(req.startDate && req.endDate) {
        const betweenBookings = await Booking.find({"$and": [{startDate:{
          $gte: new Date(req.startDate)
        
        }},{startDate:{
          $lte: new Date(req.endDate)
        }},{duration:{ $gt: days}}, dateFilter]}).populate("user","name email phone userType").populate("admin","name email phone userType").exec();
        betweenBookings.map(async (list)=>{
          if(list.bookingAmount?.cash || list.bookingAmount?.online){
          const {totalAmount, onlineAmount}  = this.setFilterAmount(list,days);
          console.log(totalAmount,onlineAmount);
          list.bookingAmount["cash"] = totalAmount;
          list.bookingAmount["online"] = onlineAmount;
          }
        });

        betweenBookings.map( (list)=>{
          bookings.push(list);
        });
      }
    }
    return bookings.map((booking) => new BookingDto(booking));
  }

  setFilterAmount(request: any, days: any) {
    const cashAmt =request.bookingAmount?.cash&&request.bookingAmount?.cash/request.duration;
    const totalCash=cashAmt&&cashAmt*days;
    const totalAmount= Math.round(totalCash??0);
    const onlineAmt =request.bookingAmount?.online&&request.bookingAmount?.online/request.duration;
    const totalOnline=onlineAmt&&onlineAmt*days;
    const onlineAmount= Math.round(totalOnline??0);

    return {
      totalAmount,
      onlineAmount
    };
  }

  public async filterBookings(request:BookingDateFilterRequestDto) {
    const bookList:any = [];
    if(request.startDate && request.endDate && request.type){
      // const endDate = DateUtils.add(new Date(request.endDate),1,"day");
      let bookedData;
      if(request.court ==="3"&&(request.type===BookingType.Turf||request.type===BookingType.Playstaion)){
        bookedData = [
          { $match:{ type:request.type}},
          {$match: { $or: [{ court: "1" }, { court: "2" }] }},
          { $match:{ isRefund:false}},
          { $match: {startDate: {
            $gte: new Date(request.startDate)
          }}},
          { $match:{endDate: {
            $lte: new Date(request.endDate)
          }}},
          
          {"$group" : {_id:{startTime:"$startTime",endTime:"$endTime",type:"$type"},count:{$sum:1}}},
        
        ];
      }else{
        bookedData= [

          { $match:{ type:request.type}},
          { $match:{ court:request.court}},
          { $match:{ isRefund:false}},
          { $match: {startDate: {
            $gte: new Date(request.startDate)
          }}},
          { $match:{endDate: {
            $lte: new Date(request.endDate)
          }}},
          
          {"$group" : {_id:{startTime:"$startTime",endTime:"$endTime",type:"$type"},count:{$sum:1}}},
        
        ];
      }
      const bookingsList =  await Booking.aggregate(bookedData); 
      bookingsList.filter(async (book)=>{
        if (request.type !== undefined) {
          if (book["count"] >= 1) {
            bookList.push(
              {
                startTime:book._id.startTime,
                endTime: book._id.endTime,
                startDate: book._id.startDate,
                endDate: book._id.endDate,
                type: book._id.type
              }
            );
          }
        }
      });
    }
    return bookList;
  }
 
}
