import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAge',
})
export class GetAgePipe implements PipeTransform {
  transform(date: string): unknown {
    if (date != null && date != '') {
      if (typeof date === 'string') {
        var parsedDate = new Date(parseInt(date.substr(0, 4)),
          parseInt(date.substr(4, 2)) - 1,
          parseInt(date.substr(6, 2)));

       
        let birthDate = new Date(
          parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60 * 1000
        );
        var currentYear = new Date().getFullYear();
        let timeDiff = Math.abs(currentYear - birthDate.getFullYear());
        return timeDiff;
      }
    }
  }
}
