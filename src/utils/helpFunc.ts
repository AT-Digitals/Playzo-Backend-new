import DateUtils from "./DateUtils";
import moment from "moment";

export function convertToNum(param: any) {
    return parseInt(param);
}

export function convertToString(param: any){
    return param.toString();
}

function convertTimeStringtoNum(param: string){
    const time = parseInt(param.split(" ")[0]);
    if(param.split(" ")[1].toLowerCase() === "am"){
        return time === 12 ? 0 : time;
    }else {
        return time === 12 ? time : time + 12;
    }
}

export function filterBookingList(bookingList: any, newStartDate: any,newEndDate: any, newStartTime: any, newEndTime: any, duration: any){
    const filteredList: any[] = [];
    for (let i = 0; i < bookingList.length; i++) {
        const booking = bookingList[i];
        let oldOnlyStartTime: any = moment.unix((booking.startTime)/1000).format("hh A");
        oldOnlyStartTime = convertTimeStringtoNum(oldOnlyStartTime);
        const oldStartMSDate = moment.unix((booking.startTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
        const oldEndMSDate = moment.unix((booking.endTime)/1000).format("YYYY-MM-DD hh:mm:ss A");    
        let oldOnlyEndTime: any = moment.unix((booking.endTime)/1000).format("hh A");    
        oldOnlyEndTime = convertTimeStringtoNum(oldOnlyEndTime);
 
        let newOnlyStartTime: any = moment.unix((newStartTime)/1000).format("hh A");
        newOnlyStartTime = convertTimeStringtoNum(newOnlyStartTime);
        const newStartMSDate = moment.unix((newStartTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
        const newEndMSDate = moment.unix((newEndTime)/1000).format("YYYY-MM-DD hh:mm:ss A");
        let newOnlyEndTime: any = moment.unix((newEndTime)/1000).format("hh A");
        newOnlyEndTime = convertTimeStringtoNum(newOnlyEndTime);
        
        const formattedStartDate = DateUtils.joinDate(newStartMSDate, oldStartMSDate);
        //converting oldEndtime to newStartDAte if duration is greter than 1
        const formattedEndDate = DateUtils.joinDate(duration > 1 ? newStartMSDate : newEndMSDate, oldEndMSDate);
        const newformattedEndDate = DateUtils.joinDate(newStartMSDate, newEndMSDate);
 
        const formattedStartMS = moment(formattedStartDate, "YYYY-MM-DD hh:mm:ss A").valueOf();
        const formattedEndMS = moment(formattedEndDate,  "YYYY-MM-DD hh:mm:ss A").valueOf();
        const newformattedEndMS = moment(newformattedEndDate, "YYYY-MM-DD hh:mm:ss A").valueOf();

        //converting newEnDtime to newStartDate if duration is greter than 1
        const useEndTime = duration > 1 ? newformattedEndMS : newEndTime;
 
        //condition for checking prev & after slots only for bulkbooking
        if(duration > 1 && (DateUtils.checkIsSame(newStartDate, booking.startDate) && DateUtils.checkIsSame(newEndDate, booking.endDate)) && ((oldOnlyEndTime <= newOnlyStartTime) || (oldOnlyStartTime > newOnlyStartTime && newOnlyEndTime <= oldOnlyStartTime))){
         continue;
        }else if(!(DateUtils.checkIsAfter(newEndDate, booking.endDate)) && (formattedStartMS < useEndTime) && (formattedEndMS > newStartTime)){
         filteredList.push(booking);
        }        
    }

    return filteredList;
}

export function randomAlphaNumeric(length: any, chars: string | any[]) {
    let result = "";
    for (let i = length; i > 0; --i) {result += chars[Math.round(Math.random() * (chars.length - 1))];}
    return result;
}

export function combineFilterBookingsDate(filterBookings: any) {
    const combinedFilterBookings: any = [];
    for (let i = 0; i < filterBookings.length - 1; i++) {
        const booking = {...filterBookings[i]};

        for (let j = i+1; j < filterBookings.length; j++) {
            const nextBooking = {...filterBookings[j]}; 
            
            if((booking["_id"]["membership"] && nextBooking["_id"]["membership"]) && booking["_id"]["startTime"] < nextBooking["_id"]["endTime"] && booking["_id"]["endTime"] > nextBooking["_id"]["startTime"]){
                booking["count"] = booking["count"] + nextBooking["count"];
            } 
            
        }

        combinedFilterBookings.push(booking);
    }
    if(filterBookings.length > 0){
        combinedFilterBookings.push(filterBookings[filterBookings.length - 1]);
    }
    return combinedFilterBookings;
}