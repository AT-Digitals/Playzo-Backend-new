import DateUtils from "./DateUtils";
import moment from "moment";

export function convertToNum(param: any) {
    return parseInt(param);
}

export function convertToString(param: any){
    return param.toString();
}

function convertTimeStringtoNum(param: string){
    if(param.split(" ")[1].toLowerCase() === "am"){
        return parseInt(param.split(" ")[0]);
    }else {
        return (parseInt(param.split(" ")[0]) + 12) !== 24 ? (parseInt(param.split(" ")[0]) + 12) : 0;
    }
}

export function filterBookingList(bookingList: any, newStartDate: any,newEndDate: any, newStartTime: any, newEndTime: any){
    const filteredList: any[] = [];
    for (let i = 0; i < bookingList.length; i++) {
        const booking = bookingList[i];
        const oldStartMSDate = moment.unix((booking.startTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
        const oldEndMSDate = moment.unix((booking.endTime)/1000).format("YYYY-MM-DD hh:mm:ss A");    
        let oldOnlyEndTime: any = moment.unix((booking.endTime)/1000).format("hh A");    
        oldOnlyEndTime = convertTimeStringtoNum(oldOnlyEndTime);
 
        let newOnlyStartTime: any = moment.unix((newStartTime)/1000).format("hh A");
        newOnlyStartTime = convertTimeStringtoNum(newOnlyStartTime);
        const newStartMSDate = moment.unix((newStartTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
        const newEndMSDate = moment.unix((newEndTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
        
        const formattedStartDate = DateUtils.joinDate(newStartMSDate, oldStartMSDate);
        const formattedEndDate = DateUtils.joinDate(newEndMSDate, oldEndMSDate);
 
        const formattedStartMS = moment(formattedStartDate, "YYYY-MM-DD hh:mm:ss A").valueOf();
        const formattedEndMS = moment(formattedEndDate,  "YYYY-MM-DD hh:mm:ss A").valueOf();
 
        if((DateUtils.checkIsSame(newStartDate, booking.startDate) && DateUtils.checkIsSame(newEndDate, booking.endDate)) && (oldOnlyEndTime <= newOnlyStartTime)){
         continue;
        }else if(!(DateUtils.checkIsAfter(newEndDate, booking.endDate)) && (formattedStartMS < newEndTime) && (formattedEndMS > newStartTime)){
         filteredList.push(booking);
        }        
    }

    return filteredList;
}