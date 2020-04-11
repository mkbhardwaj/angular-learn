import { Directive,ViewContainerRef } from '@angular/core';

@Directive({
    selector:'[appPlaceholder]' // attribute selector
})
export class PlaceHolderDirective {
constructor(public viewContainerRef:ViewContainerRef){
    
}
}