import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arTrans'
})
export class ArTransPipe implements PipeTransform {

  transform(status: string = ""): any {

    if (!status?.trim()) return;

    let arStatusArr: any = {

      "STATUS": "حالة الخدمة",

      "FAIL": "فشل التنفيذ",
      "PROCESSING": "قيد التنفيذ",
      "SUCCESS": "تم التنفيذ",

      "INITIALIZED": "",
      "NOT REFUNDED": "تدقيق إسترداد",
      "REFUNDED": "تم الاسترداد",
      "CANCELED": "ملغية",

      // Payment Channel
      "GATEWAY": "بوابة الدفع",
      "POS": "نقاط البيع",
      "SMARTPOS": "نقاط الدفع الذكية",
      "ESTAMP": "الطابع الإلكتروني",
      "CREDIT CARD": "البطاقات الائتمانية",
      "ALL": "كافة القنوات"
    };

    return arStatusArr[status?.trim().toUpperCase()] ? arStatusArr[status?.trim().toUpperCase()].toString() : "";
  }
}