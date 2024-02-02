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
import moment from "moment";

@Service()
export default class BookingService {

  async create(request: BookingRequestDto) {
   const endDate = DateUtils.add(new Date(request.endDate),1,"day");

      const bookingList = await Booking.find(
      {
        $and: [
          {startTime: {
            $lte: request.endTime
          }},
        {endTime: {
            $gte: request.startTime
          }},
          {  type: request.type },
        ],
      }
      );

      // const result = await Booking.find(
      //   {
      //     $and: [
      //       {startDate: {
      //         $gte: new Date(request.startDate)
      //       }},
      //     {endDate: {
      //       $lte: new Date(endDate)
      //       }},
      //       {  type: request.type },
      //     ],
      //   }
      //   );

//   bookingList.map((list)=>{
//   if(list.startTime <= request.startTime && list.endTime >= request.endTime){

//   }

// });

// const bookingList = result.filter((list) => (request.startTime <= list.startTime && request.endTime >= list.endTime)||(request.startTime >= list.startTime && request.endTime <= list.endTime)||(request.startTime >= list.startTime && request.endTime >= list.endTime)||(request.startTime <= list.startTime && request.endTime <= list.endTime));

      if (bookingList.length >= BookingLength[request.type]) {
        throw new AppErrorDto(AppError.ALREADY_BOOKED);
      }
      else {
        let booking = new Booking(request);
        booking.user = request.user;
        booking.dateOfBooking = new Date();
     
        const courtList =  await bookingList.map((bookingData)=>{
            if(bookingData.court === request.court){
              throw new AppErrorDto("This Court already booked. Please choose another Court"); 
            }
            return bookingData;
          });
        if(request.court!==undefined){
          booking.court = request.court;
          //check if that court is already booked or not, by iterating bookungList array. If it is already booked then throw error
        }else{
          const finalCourt= courtList.filter((countCourt)=>{
return countCourt.court&& parseInt(countCourt.court)<=BookingLength[request.type];
          });
          if(finalCourt.length > 0){
            finalCourt.map((courtData)=>{ 
              for(let i =1;i<=BookingLength[request.type];i++){
if(courtData.court && parseInt(courtData.court)!==i){
  booking.court = i.toString();

}
              }
          });
        
        }else{
          booking.court = `${(bookingList.length>0?bookingList.length+1:1)}`;
        }
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
        booking.duration = moment(endDate).diff(moment(request.startDate),"days")+"days";
        //Amount Calculations
        const duration = moment.duration(moment(request.endTime).diff(moment(request.startTime)));
        const hours = parseInt(duration.asHours().toString());
        const minutes = parseInt(duration.asMinutes().toString()) % 60;
        const totalmm = parseInt(booking.duration) * minutes;
        const mm = totalmm % 60;
        const hh = Math.floor(totalmm / 60);
        const GetAmount = await Amount.find({bookingtype : request.type});
        const amountValue = parseInt(GetAmount[0].bookingAmount.toString());
        const finalMinutes = mm > 0 ? (amountValue/2) : 0;
        const totalHH = hours*parseInt(booking.duration);
        const finalHour = (totalHH + hh) * amountValue ;

        const totalCash = finalMinutes+finalHour;
        const onlineAmount = totalCash*(30/100);

        if(request.bookingtype === PaymentType.Cash){
          booking.bookingAmount = {
                online : 0, 
                cash: totalCash,
                total: totalCash
          };
        }else{
          booking.bookingAmount = {
            online : onlineAmount, 
            cash: 0,
            total: onlineAmount
          };
        }
        booking = await booking.save();
          
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
    const booking = await Booking.findOne({ _id:id });
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
        online : 0, 
        cash: request.bookingAmount.cash,
        total: parseInt(request.bookingAmount.cash.toString()) + 0
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
    if(request.bookingAmount){
    booking.bookingAmount =
    {
        online :request.bookingAmount.online, 
        cash: request.bookingAmount.cash,
        total: parseInt(request.bookingAmount.cash.toString()) + parseInt(request.bookingAmount.online.toString())
    };
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
    console.log("ajjj",request.bookingtype);
    if(request.limit && request.page){
    bookings = await Booking.find( {
      bookingtype: request.bookingtype
  }).skip((+request.page - 1) * request.limit).limit(request.limit).populate("user","name email phone userType").exec();
  console.log("ajj1",bookings);
}
  else{
    bookings = await Booking.find( {
      bookingtype: request.bookingtype

  });
  console.log("ajj2",bookings);
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
