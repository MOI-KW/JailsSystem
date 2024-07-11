import {Directive, HostListener, Input} from '@angular/core'

@Directive({
  selector: '[appAutoTab]'
})
export class AutoTabDirective {

  @Input('appAutoTab') appAutoTab: any;

  @HostListener('input', ['$event.target']) onInput(input: any) {
    const length = input.value.length
    const maxLength = input.attributes.maxlength.value
    if (length >= maxLength) {
      this.appAutoTab.focus()
    }
  }
}