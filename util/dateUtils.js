import dayjs from 'dayjs';
import {fromNow} from "dayjs";
import 'dayjs/locale/en'; // Import the desired locale
import relativeTime from 'dayjs/plugin/relativeTime';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

 // Set the locale
 dayjs.locale('en');

// to format date to ex. 5 minutes ago
export function timePassed(date){
    dayjs.extend(relativeTime)
    // Parse the ISO string using Day.js
    const parsedTime = dayjs(date);
    // Format the parsed time as "X time ago"
    const formattedTime = parsedTime.fromNow();
    
    return formattedTime;
}

// To format date to: ex. Aug 12, 2023
export function shortDate(date){
    dayjs.extend(LocalizedFormat)
    const formattedDate = dayjs(date).format('ll');

    return formattedDate;
}

// To format date to ex: 08/12/2023 which is MM/DD/YYYY
export function numberOnlyDate(date){
    dayjs.extend(LocalizedFormat)
    const formattedDate = dayjs(date).format('L') 

    return formattedDate;
}
