import { Directive, ElementRef,OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicAttribute]'
})
export class BasicAttributeDirective implements OnInit {

  constructor(private elementRef:ElementRef) { }
  ngOnInit(){
    this.elementRef.nativeElement.style="background-color:red";
  }
}
