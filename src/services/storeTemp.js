import moment from "moment";

export const loadDataAnesthetics = () => {
    let arrayData = [];
    let p_current = moment().format("YYYY-MM-DD");
    let p_subtract = moment().subtract(parseInt(1), 'months').format('YYYY-MM-DD');
    console.log(p_current+ ' - '+p_subtract);
    
    while (p_subtract < p_current) {
        p_subtract = moment(p_subtract).add(1, 'days').format('YYYY-MM-DD');
        arrayData.push([moment.utc(p_subtract).valueOf(), parseInt(Math.floor((Math.random() * 100) + 1))]);
      } 

      
      return arrayData;

  };