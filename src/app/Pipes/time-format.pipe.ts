import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(time:string): unknown {
    if (time != null && time != '') {
      if (typeof time === 'string') {
        let datetime = parseInt(time.substr(0, 2))
        let datetime2 = parseInt(time.substr(2, 2))
        let datetime3 = parseInt(time.substr(4, 2));
        let newDate = new Date(0,0,0,datetime,datetime2,datetime3)
        return newDate.toLocaleTimeString('ar-US',{ hour: "2-digit", minute: "2-digit" });
      } else {
        return ''
      }
    }
  
  }
}
