import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]', // This is the attribute name
  standalone: true
})
export class HighlightDirective {
  // 1. Inject ElementRef to get a "hook" into the actual HTML element
  private el = inject(ElementRef);

  // 2. Listen for the mouse entering the area
  @HostListener('mouseenter') onMouseEnter() {
    this.changeBgColor('#f0f8ff'); // Light AliceBlue
  }

  // 3. Listen for the mouse leaving the area
  @HostListener('mouseleave') onMouseLeave() {
    this.changeBgColor(''); // Reset to original
  }

  private changeBgColor(color: string) {
    // We touch the native browser element directly
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transition = '0.3s ease';
  }
}