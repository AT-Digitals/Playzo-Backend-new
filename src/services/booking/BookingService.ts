import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Booking } from "../../models/booking/Booking";
import { BookingDateFilterRequestDto } from "../../dto/Booking/BookingDateFilterRequestDto";
import { BookingDto } from "../../dto/Booking/BookingDto";
import { BookingLength } from "../../enum/BookingLength";
import { BookingModel } from "../../models/booking/BookingModel";
import { BookingRequestDto } from "../../dto/Booking/BookingRequestDto";
import DateUtils from "../../utils/DateUtils";
import PaginationRequestDto from "../../dto/PaginationRequestDto";
import { PaymentType } from "../../models/booking/PaymentType";
import { Service } from "typedi";
import moment from "moment";

// import twilio from "twilio";

// const accountSid = "AC218186c205d28b50087564e88e42af25";
// const authToken = "af3c8b3946a478552fc1986072517b7e";
// const client = twilio(accountSid, authToken);
@Service()
export default class BookingService {

  async create(request: BookingRequestDto) {
   const endDate = DateUtils.add(new Date(request.endDate),1,"day");

      const bookingList = await Booking.find(
      {
        $and: [
          
        {startDate: {
            $gte: new Date(request.startDate)
          }},
        {endDate: {
            $lte: new Date(endDate)
          }},
          {startTime: {
            $gte: request.startTime
          }},
        {endTime: {
            $lte: request.endTime
          }},
          {  type: request.type },
        ],
      }
      );
      // const type = request.type as string;
      // BookingLength[type as keyof typeof BookingLength]

      if (bookingList.length >= BookingLength[request.type]) {
        throw new AppErrorDto(AppError.ALREADY_BOOKED);
      }
      else{
        let booking = new Booking(request);
        booking.user = request.user;
        booking.dateOfBooking = new Date();
        if(request.court){
          booking.court = request.court;
        }else{
        booking.court = request.type + "court"+ (bookingList.length>0?bookingList.length+1:1);
        }
        if(request.bookingId!==""){
        booking.bookingId = request.bookingId;
        }
        const diffDuration = moment.duration(moment(request.endDate).diff(moment(request.startDate)));
if(diffDuration.years() > 0){
  booking.isAnnual = true;
}else{
  booking.isAnnual = false;
}
booking.duration = moment(request.endDate).diff(moment(request.startDate),"days")+"days";
if(request.bookingtype === PaymentType.Cash){

  booking.bookingAmount = {
        online : 0, 
        cash: 3000,
        total: 3000
  };
}else{
  booking.bookingAmount = {
    online : 3000, 
    cash: 0,
    total: 3000
};
}
        booking = await booking.save();
          //  { 
  //   endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },
  // },
   // {endTime: request.endTime},
          // {startTime: request.startTime},
          
      // await client.messages
      // .create({
      //    from: "whatsapp:+14155238886",
      //    body: "Hello there!",
      //    to: "whatsapp:+919384735800"
      //  })
      // .then(message => console.log(message.sid));
        return booking;
      }
      // "whatsapp:+12059734320",
  }

  async findById(id: string) {
    const booking = await Booking.findOne({ id });
    if (!booking) {
      throw new AppErrorDto(AppError.NOT_FOUND);
    }
    return booking;

  }

  public async getAll() {
    
    const bookings = await Booking.find({}).populate("user","name email phone userType").exec();
    return bookings.map((booking) => new BookingDto(booking));
  }

  public async getAllBookings(query:PaginationRequestDto) {
    let bookings: BookingModel[] = [];
    if(query && query.page && query.limit){
       bookings = await Booking.find({}).skip((+query.page - 1) * query.limit).limit(query.limit).populate("user","name email phone userType").exec();
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
        online : request.bookingAmount.online, 
        cash: request.bookingAmount.cash,
        total: request.bookingAmount.online + request.bookingAmount.cash
    }
    }
    booking.bookingtype = request.bookingtype;
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

  async getAllFilter(req: any) {
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
 }

 const bookings = await Booking.find({"$and": [newFilter]}).populate("user","name email phone userType").exec();
 return bookings.map((booking) => new BookingDto(booking));
   }

async getAllDateFilter(req: any) {
  
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
   }
 
   console.log("a",newFilter);

let bookings: BookingModel[] = [];
if(req && req.page && req.limit){
   
  bookings = await Booking.find( {"$and": [newFilter]}).skip((+req.page - 1) * req.limit).limit(req.limit).populate("user","name email phone userType").exec();
}
return bookings.map((booking) => new BookingDto(booking));
  }

public async filterBookings(request:BookingDateFilterRequestDto) {
const bookList:any = [];
if(request.startDate && request.endDate && request.type){
    const endDate = DateUtils.add(new Date(request.endDate),1,"day");
const bookingsList =  await Booking.aggregate([

  { $match:{ type:request.type}},
  { $match: {startDate: {
    $gte: new Date(request.startDate)
  }}},
  { $match:{endDate: {
    $lte: new Date(endDate)
  }}},
  
  {"$group" : {_id:{startDate:"$startDate",endDate:"$endDate",startTime:"$startTime",endTime:"$endTime",type:"$type"},count:{$sum:1}}},

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

  public async filterDateBookings(request:BookingDateFilterRequestDto) {
    console.log("req",request.type);
    let bookings:BookingModel[] =[];

 if(request.startDate && request.endDate){
     const endDate = DateUtils.add(new Date(request.endDate),1,"day");
      if(request?.limit && request.page){
      bookings = await Booking.find( {
        endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },

    }).skip((+(request.page) - 1) * (request.limit)).limit((request.limit)).populate("user","name email phone userType").exec();
  }else{
    bookings = await Booking.find( {
      endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },

  });
  }
  }

    if(request.startDate && request.endDate && request.type){
      const endDate = DateUtils.add(new Date(request.endDate),1,"day");
      if(request?.limit && request.page){
      bookings = await Booking.find( {
        type: request.type,
        endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },

    }).skip((+(request.page) - 1) * (request.limit)).limit((request.limit)).populate("user","name email phone userType").exec();}
    else{
      bookings = await Booking.find( {
        type: request.type,
        endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },

    });
    }
    }
    if(request.bookingtype){
      if(request?.limit && request.page){
      bookings = await Booking.find( {
        bookingtype: request.bookingtype,

    }).skip((+(request.page) - 1) * (request.limit)).limit((request.limit)).populate("user","name email phone userType").exec();
  }else{
    bookings = await Booking.find( {
      bookingtype: request.bookingtype,

  });
  }
  }
  if(request.startDate && request.endDate && request.bookingtype){
    const endDate = DateUtils.add(new Date(request.endDate),1,"day");
    if(request?.limit && request.page){
    bookings = await Booking.find( {
      bookingtype: request.bookingtype,
      endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },

  }).skip((+(request.page) - 1) * (request.limit)).limit((request.limit)).populate("user","name email phone userType").exec();
}
else{
  bookings = await Booking.find( {
    bookingtype: request.bookingtype,
    endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },

});
}
  }
  if(request.startDate && request.endDate && request.type && request.bookingtype){
    const endDate = DateUtils.add(new Date(request.endDate),1,"day");
    if(request?.limit && request.page){
    bookings = await Booking.find( {
      type: request.type,
      bookingtype: request.bookingtype,
      endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },

  }).skip((+(request.page) - 1) * (request.limit)).limit((request.limit)).populate("user","name email phone userType").exec();}
  else{
    bookings = await Booking.find( {
      type: request.type,
      bookingtype: request.bookingtype,
      endDate: {"$gte":new Date(request.startDate),"$lt":new Date(endDate) },

  }); 
  }
  }

  if(request.type && request.bookingtype){
    if(request?.limit && request.page){
    bookings = await Booking.find( {
      type: request.type,
      bookingtype: request.bookingtype,

  }).skip((+(request.page) - 1) * (request.limit)).limit((request.limit)).populate("user","name email phone userType").exec();}
  else{
    bookings = await Booking.find( {
      type: request.type,
      bookingtype: request.bookingtype,

  });
  }

  }
  if(request.bookingtype){
    console.log("ajjj",request.bookingtype)
    if(request.limit && request.page){
    bookings = await Booking.find( {
      bookingtype: request.bookingtype
  }).skip((+request.page - 1) * request.limit).limit(request.limit).populate("user","name email phone userType").exec();
  console.log("ajj1",bookings)
}
  else{
    bookings = await Booking.find( {
      bookingtype: request.bookingtype

  });
  console.log("ajj2",bookings)
  }

  }
  if(request.type){
    if(request?.limit && request.page){
    bookings = await Booking.find( {
      type: request.type,

  }).skip((+(request.page) - 1) * (request.limit)).limit((request.limit)).populate("user","name email phone userType").exec();}
  else{
    bookings = await Booking.find( {
      type: request.type,

  });
  }

  }

  console.log("bookings",bookings);
    return bookings.map((booking) => new BookingDto(booking));
  }
}
