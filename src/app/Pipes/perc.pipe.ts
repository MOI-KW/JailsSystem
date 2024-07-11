import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perc'
})
export class PercPipe implements PipeTransform {

  transform(val: any): string {

    if (!val) return "0";

    return (Number(parseFloat(val).toFixed(2))).toFixed(2);
  }
}