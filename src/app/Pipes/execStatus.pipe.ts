import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'execStatus'
})
export class ExecStatusPipe implements PipeTransform {

  transform(status: any): any {

    if (!status) return;

    let statusArr: any = {

      "0": "لم يتم التنفيذ",
      "1": "تم التنفيذ"
    };

    return statusArr[status] ? statusArr[status.toString()] : "";
  }
}