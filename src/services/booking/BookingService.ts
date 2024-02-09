import { Amount } from "../../models/amount/Amount";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { BookingAmountRequestDto } from "../../dto/Booking/BookingAmountRequestDto";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";
import { BookingDto } from "../../dto/Booking/BookingDto";
import { BookingLength } from "../../enum/BookingLength";
import { BookingModel } from "../../models/booking/BookingModel";
import { BookingRequestDto } from "../../dto/Booking/BookingRequestDto";
import DateUtils from "../../utils/DateUtils";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import { PaymentType } from "../../models/booking/PaymentType";
import { Service } from "typedi";
import { convertToNum } from "../../utils/helpFunc";
import moment from "moment";

@Service()
export default class BookingService {

  async create(request: BookingRequestDto) {
   const endDate = DateUtils.add(new Date(request.endDate),1,"day");

      const bookingList = await Booking.find(
      {
        $and: [
          {startTime: {
            $lt: request.endTime
          }},
        {endTime: {
            $gt: request.startTime
          }},
          {  type: request.type },
          {deleted:false}
        ],
      }
      );

      if (bookingList.length >= BookingLength[request.type]) {
        throw new AppErrorDto(AppError.ALREADY_BOOKED);
      }
      else {
        let booking = new Booking(request);
        booking.user = request.user;
        booking.dateOfBooking = new Date();

        if(request.court !== undefined && request.court !== ""){
           //check if that court is already booked or not, by iterating bookungList array. If it is already booked then throw error
          bookingList.forEach((bookingData)=>{
            if(bookingData.court === request.court){
              throw new AppErrorDto("This Court already booked. Please choose another Court"); 
            }
          });

          booking.court = request.court;
        }else{
          //find the first missing court number
          let courtNumber = null;
          for (let i = 1; i <= BookingLength[request.type]; i++) {
            for (let j = 0; j < bookingList.length; j++) {
              if(bookingList[j].court && convertToNum(bookingList[j].court) !== i){
                courtNumber = i.toString();
                booking.court = i.toString();
                break;
              }
            }
            if(courtNumber){
              break;
            }
          }

          if(!courtNumber){
            booking.court = "1";
          }
          
        }
        if(request.bookingId !== ""){
          booking.bookingId = request.bookingId;
        }
        const diffDuration = moment.duration(moment(request.endDate).diff(moment(request.startDate)));
        const days = moment(endDate).diff(moment(request.startDate),"days");
        booking.isAnnual = diffDuration.years() > 0;
        booking.duration = days;
        
        //Amount Calculations
        const {totalAmount, onlineAmount} = await this.getAmount(request, days);
        let requestBookingAmount = 0;
        
        if(request.bookingAmount?.cash){
          requestBookingAmount = request.bookingAmount?.cash;
        }

        if(request.bookingtype === PaymentType.Cash){
          booking.bookingAmount = {
                online : 0, 
                cash: requestBookingAmount === 0 ? totalAmount : requestBookingAmount,
                total: requestBookingAmount === 0 ? totalAmount : requestBookingAmount,
                refund:0
          };
        }else{
          booking.bookingAmount = {
            online : onlineAmount, 
            cash: 0,
            total: onlineAmount,
            refund:0
          };
        }
        booking.deleted = false;
        booking = await booking.save();
        return booking;
      }
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
    
    const bookings = await Booking.find( {deleted:false}).populate("user","name email phone userType").exec();
    return bookings.map((booking) => new BookingDto(booking));
  }

  public async getAllBookings(query:PaginationRequestDto) {
    let bookings: BookingModel[] = [];
    if(query && query.page && query.limit){
       bookings = await Booking.find( {deleted:false}).skip((+query.page - 1) * query.limit).limit(query.limit).populate("user","name email phone userType").exec();
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
    
    if(request.bookingAmount && booking.bookingAmount){
     
      if(request.isRefund){
    booking.bookingAmount =
    {
        online : request.bookingAmount.online, 
        cash: request.bookingAmount.cash,
        total: request.bookingAmount.total,
        refund:request.bookingAmount.refund
    };
   
      booking.isRefund = true;
      booking.deleted = true;
    }else{
      const cashAmount = parseInt(request.bookingAmount.cash.toString())  + parseInt(booking.bookingAmount.cash.toString());
      const onlineAmount = parseInt(request.bookingAmount.online.toString()) + parseInt(booking.bookingAmount.online.toString());
      const finalAmount = cashAmount+onlineAmount;
      booking.bookingAmount =
      {
          online : onlineAmount, 
          cash: cashAmount,
          total: finalAmount,
          refund:0
      };
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

 const bookings = await Booking.find({"$and": [newFilter, {deleted:false}]}).populate("user","name email phone userType").exec();
   
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
    }},{duration:{ $gt: days}}, dateFilter,{deleted:false}]}).populate("user","name email phone userType").exec();
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

let bookings: BookingModel[] = [];
if(req && req.page && req.limit){
   
  bookings = await Booking.find( {"$and": [newFilter, {deleted:false}]}).skip((+req.page - 1) * req.limit).limit(req.limit).populate("user","name email phone userType").exec();
  
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
    }},{duration:{ $gt: days}}, dateFilter,{deleted:false}]}).populate("user","name email phone userType").exec();
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
}

return bookings.map((booking) => new BookingDto(booking));
  }
  async setFilterAmount(request: any, days: any) {
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
    const endDate = DateUtils.add(new Date(request.endDate),1,"day");
const bookingsList =  await Booking.aggregate([

  { $match:{ type:request.type}},
  { $match:{ deleted:false}},
  { $match: {startDate: {
    $gte: new Date(request.startDate)
  }}},
  { $match:{endDate: {
    $lte: new Date(endDate)
  }}},
  
  {"$group" : {_id:{startTime:"$startTime",endTime:"$endTime",type:"$type"},count:{$sum:1}}},

]); 
bookingsList.filter(async (book)=>{
if (request.type !== undefined) {
  if (book["count"] >= BookingLength[request.type]) {
  bookList.push({startTime:book._id.startTime,
       endTime: book._id.endTime,
       startDate: book._id.startDate,
       endDate: book._id.endDate,
        type: book._id.type});
}
}
}) ;
}
return bookList;
  }
 
}
