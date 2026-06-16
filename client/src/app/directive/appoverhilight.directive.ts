import { Directive ,HostListener,ElementRef,Renderer2, Input} from '@angular/core';

@Directive({
  selector: '[appoverhilight]'
})
export class appoverhighlight {

   @Input('color') highlightColor: string = '#1c5d88ff';
    
  private defaultColor: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.defaultColor = this.el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = this.defaultColor;
  }
}

