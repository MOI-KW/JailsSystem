import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetimeFormat'
})
export class DatetimeFormatPipe implements PipeTransform {

  transform(inputDateTime: string): string {
    if (!inputDateTime) {
      return '';
    }

    // Split the input string into date and time components
    const datePart = inputDateTime.substr(0, 8);
    const timePart = inputDateTime.substr(8, 6);

    // Use regular expressions to format the date
    const formattedDate = datePart.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

    // Use regular expressions to format the time
    const formattedTime = timePart.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
    let formattedDateTime = formattedDate
    if(formattedTime !='')
      {
        formattedDateTime  =formattedDate + ' - ' + formattedTime;
      }
     
    // Combine the formatted date and time
  

    return formattedDateTime;
  }

}
