import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arResult'
})
export class ArResultPipe implements PipeTransform {

  transform(status: string = ""): any {

    if (!status?.trim()) return;

    let arStatusArr: any = {

      "RESULTS":"حالة عملية الدفع",

      "APPROVED": "مقبولة", 
      "CANCELED": "ملغية", 
      "CAPTURED": "ناجحة", 
      "DECLINED": "مرفوضة", 
      "DENIED": "مرفوضة", 
      "DENIED BY RISK": "غير موثوقة", 
      "FAILURE": "فشلت", 
      "HOST TIMEOUT": "أنتهى الوقت", 
      "INITIALIZED": "بدأت", 
      "NOT+CAPTURED": "فشلت", 
      "SUSPENDED": "موقوفة", 
      "SUSPECTED": "مشتبهة", 
      "VOIDED": "مبطلة", 
      "REFUNDED": "تم الاسترداد", 
      "NOT REFUNDED": "تدقيق إسترداد", 
      
      "FAIL": "فشل التنفيذ",
      "PROCESSING": "قيد التنفيذ",
      "SUCCESS": "تم التنفيذ"
    };

    return arStatusArr[status?.trim().toUpperCase()] ? arStatusArr[status?.trim().toUpperCase()].toString() : "";
  }
}