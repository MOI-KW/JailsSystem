import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amt'
})
export class AmtPipe implements PipeTransform {

  transform(amount: any): string {

    if (!amount || amount == 0 || amount == "0") return "0";

    return (Number(parseFloat(amount).toFixed(3))).toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}