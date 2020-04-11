import {
  Directive,
  Input,
  HostBinding,
  HostListener,
  Renderer2,
  OnInit,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appAdvanceAttribute]'
})
export class AdvanceAttributeDirective implements OnInit {
 
  @Input() defaultArg : string ='transparent';
  @Input() changeArg : string ='blue';
   // bind a elemnt's property to the property 
  @HostBinding('style.backgroundColor') bgColor='transparent';
  
  // listen to the event
  
   @HostListener('mouseenter')  onmouseenter(eventData:Event){
     this.bgColor=this.changeArg;
    //this.rendere.setStyle(this.elementref.nativeElement, 'backgroundColor', 'blue');
   }
   @HostListener('mouseleave')  onmouseleave(eventData:Event){
    this.bgColor=this.defaultArg;
    //this.rendere.setStyle(this.elementref.nativeElement, 'backgroundColor', 'transparent');
   }
  constructor(private elementref: ElementRef, private rendere: Renderer2) { }

  ngOnInit() {
    this.bgColor=this.defaultArg;
    //this.rendere.setStyle(this.elementref.nativeElement, 'backgroundColor', 'transparent');
  }

}
