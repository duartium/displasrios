import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumericField]'
})
export class AlphanumericFieldDirective {

  constructor() { }

  @HostListener("keydown", ["$event"]) public onKeydown(event: KeyboardEvent) {
    var regex = new RegExp("[- a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,]");
    //var keyChar = String.fromCharCode(event.which || event.keyCode);
    if (!regex.test(event.key)) {
        event.preventDefault();
    }
}

}
