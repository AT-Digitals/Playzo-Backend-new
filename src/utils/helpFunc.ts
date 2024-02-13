import DateUtils from "./DateUtils";
import moment from "moment";

export function convertToNum(param: any) {
    return parseInt(param);
}

export function convertToString(param: any){
    return param.toString();
}

export function filterBookingList(bookingList: any, newEndDate: any, newStartTime: any, newEndTime: any){
    const filteredList: any[] = [];
    bookingList.forEach((booking: any) => {
       const oldStartMSDate = moment.unix((booking.startTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
       const oldEndMSDate = moment.unix((booking.endTime)/1000).format("YYYY-MM-DD hh:mm:ss A");        

       const newStartMSDate = moment.unix((newStartTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
       const newEndMSDate = moment.unix((newEndTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
       
       const formattedStartDate = DateUtils.joinDate(newStartMSDate, oldStartMSDate);
       const formattedEndDate = DateUtils.joinDate(newEndMSDate, oldEndMSDate);

       const formattedStartMS = moment(formattedStartDate, "YYYY-MM-DD hh:mm:ss A").valueOf();
       const formattedEndMS = moment(formattedEndDate,  "YYYY-MM-DD hh:mm:ss A").valueOf();

       if(!(DateUtils.checkIsAfter(newEndDate, booking.endDate)) && (formattedStartMS < newEndTime) && (formattedEndMS > newStartTime)){
        filteredList.push(booking);
       }
    });

    return filteredList;
}