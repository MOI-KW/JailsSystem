import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rasedDate'
})
export class RasedDatePipe implements PipeTransform {

  transform(date: string) {
    if (date != null && date != '') {
      if (typeof date === 'string') {
        var parsedDate = new Date(parseInt(date.substr(0, 4)),
          parseInt(date.substr(4, 2)) - 1,
          parseInt(date.substr(6, 2)));
        return new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]
      } else {
        return ''
      }
    }
  }

}
