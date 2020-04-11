import { Directive
,
Input,
ViewContainerRef,
TemplateRef,
 } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
@Input('appUnless') set Unless(condition)
{
  if(condition)
  {
this.viewRef.createEmbeddedView(this.templateRef); // add the template to the view 
  }  else{
    this.viewRef.clear();
  }
}
// view ref- where to add the elemnt, template ref : what to add
  constructor(private viewRef:ViewContainerRef,private templateRef:TemplateRef<any>) { }

}
