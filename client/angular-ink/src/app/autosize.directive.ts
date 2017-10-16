import { Directive, HostListener, AfterContentChecked, ElementRef } from '@angular/core';

@Directive({
  selector: 'textarea[appAutosize]'
})
export class AutosizeDirective implements AfterContentChecked{

  constructor(public element: ElementRef) {}

  ngAfterContentChecked(): void {
    this.adjust()
  }

  adjust(): void {
    this.element.nativeElement.style.overflow = 'hidden'
    this.element.nativeElement.style.height = 'auto'
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px'
  }

}
