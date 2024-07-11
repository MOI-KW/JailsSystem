import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arErrorId'
})
export class ArErrorIdPipe implements PipeTransform {

  transform(errorId: any): any {

    let ar: string = "";
    
    switch (errorId?.trim()) {

      case "SMARTPOS-MANUAL": ar = "إعادة محاولة الإرسال"; break; 
      case "REFUND-REQUEST": ar = "طلب  إسترداد"; break; 

      default: ar = errorId; break;
    }

    return ar;
  }
}