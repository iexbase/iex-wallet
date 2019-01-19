import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[onlyNumber]'
})

export class OnlyNumber {
    // Allow decimal numbers. The \. is only allowed once to occur
    private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: string[] = [ 'Backspace', 'Tab', 'End', 'Home' ];

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }

        const current: string = this.el.nativeElement.value;
        const next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}
