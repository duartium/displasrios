import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProductCodeField]'
})
export class ProductCodeFieldDirective {
  inputElement: HTMLElement;

  constructor(private el: ElementRef, 
    private render: Renderer2) {
    this.inputElement = el.nativeElement;

  }

  @HostListener("keydown", ["$event"]) public onKeydown(event: KeyboardEvent) {
    var regex = new RegExp("[-a-zA-Z0-9]");
    
    if (!regex.test(event.key)) {
        event.preventDefault();
    }
}

}
