import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'casesDate'
})
export class CasesDatePipe implements PipeTransform {


  transform(date: string) {
    if (date != null && date != '') {
      if (typeof date === 'string') {

        return date.substring(0, 4) + "-" + (date.substring(4, 6)) + "-" + date.substring(6, 8);

      } else {
        return ''
      }
    }
  }

}
