import {
    Directive,
    Input,
    ElementRef,
    Renderer2,
    OnInit,
    OnChanges,
    HostListener,
    HostBinding
} from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})
export class DropDownDirective implements OnInit {
@HostBinding('class.open') opened=false; 
@HostListener('document:click',['$event']) toggleOpen(event : Event){
    this.opened=this.elementRef.nativeElement.contains(event.target)? !this.opened:false;
}
constructor(private elementRef:ElementRef,private renderer: Renderer2)
{

}
ngOnInit(){

}
}