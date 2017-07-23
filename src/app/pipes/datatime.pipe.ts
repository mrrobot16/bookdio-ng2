import {Pipe, PipeTransform } from '@angular/core';

function timeAM(time){
  let hours:any = parseInt(time.slice(0,2))
  hours >= 13 ? hours = hours-12+":"+time.slice(3,5)+" PM" : hours = hours+":"+time.slice(3,5)+" AM"
  return hours
}

const month_to_num:any = {jan:"01",feb:"02",mar:"03",apr:"04",may:"05",jun:"06",jul:"07",aug:"08",sep:"09",oct:"10",nov:"11",dec:"12" }

@Pipe({name: 'returnMonthYear'})
export class ReturnMonthYearPipe implements PipeTransform {
  transform(date) {
    return date.slice(0,4)+date.substr(date.length-4)
  }
}

@Pipe({name:"returnTimeShortDate"})
export class ReturnTimeShortDate implements PipeTransform {
  timeAM(time){
    let hours:any = parseInt(time.slice(0,2))
    hours >= 13 ? hours = hours-12+":"+time.slice(3,5)+" PM" : hours = hours+":"+time.slice(3,5)+" AM"
    return hours
  }

  transform(value):String{
    value = new Date(value).toString().split(" ");
    value = this.timeAM(value[4].slice(0,-3)) +" "+ month_to_num[value[1].toLowerCase()]+"/" + value[2]+"/" + value[3];
    return value
  }
}
