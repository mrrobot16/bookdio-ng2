import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
   }

  @Input() defaultColor = 'blue';

  @Input('myHighlight') highlightColor = 'blue';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  highlight(color) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
