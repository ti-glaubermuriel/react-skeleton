import moment from "moment";
import "moment/locale/pt-br";
import locale from "antd/lib/date-picker/locale/pt_BR";


// Convert periods in format database 'YYYY-MM-DD'
export const FormatPeriodDB = arrayPeriod => {
  try {
    let p_start = moment(arrayPeriod[0], "DD/MM/YYYY").format("YYYY-MM-DD");
    let p_end = moment(arrayPeriod[1], "DD/MM/YYYY").format("YYYY-MM-DD");

    return [p_start, p_end]
  } catch (error) {
    return '?';
  }
}


// calculate days between periods 
export const PeriodSubtractMonth = numMonth => {
  try {
    let p_current = moment().format("DD/MM/YYYY");
    let p_subtract = moment().subtract(parseInt(numMonth), 'months').format('DD/MM/YYYY');

    return [p_subtract,p_current];
  } catch (error) {
    return [null, null];
  }
}

// calculate days between periods 
export const DateDiff = arrayPeriod => {
  try {
    let p_start = moment(arrayPeriod[0], "DD/MM/YYYY");
    let p_end = moment(arrayPeriod[1], "DD/MM/YYYY");

    return moment(p_end, "DD/MM/YYYY").diff(moment(p_start, "DD/MM/YYYY"), "days") ;
  } catch (error) {
    return '?';
  }
}


// Convert periods in format database 'YYYY-MM-DD'
export const ConvertSecondsToHourMinute = seconds => {
  try {

    let time = (seconds) ? moment().startOf('day').seconds(seconds).format('HH:mm') : '00:00';

    return time;

  } catch (error) {
    return '?';
  }
}



// Convert name in Letter Avatar 
export const LetterAvatar = str => {
  try {
  let initials = "";

  let strSplit = String(str)
    .toUpperCase()
    .split(" ");

  if (strSplit.length == 1) {
    initials = strSplit[0] ? strSplit[0].charAt(0) : "?";
  } else {     

    if(strSplit[1].length == 2 && strSplit.length > 2){
      initials = strSplit[0].charAt(0) + strSplit[2].charAt(0);
    }
    else{
      initials = strSplit[0].charAt(0) + strSplit[1].charAt(0);
    }
    
  }

  return initials;

  } catch (error) {
    return '?';
  }
};


// Get random exdecimal array colors
export const getRandomColor = str => {
  try {

    let arrayColors = [
      "#F07396",
      "#FF9F40",
      "#FFCD56",
      "#4BBFBF",
      "#36A2EB",
      "#9966FF",
      "#C9CBCF",
      "#62D171",
      "#E270EF",
      "#E35C5C"
    ];

    return arrayColors[Math.floor(Math.random() * arrayColors.length)];


  } catch (error) {
    return '?';
  }
}