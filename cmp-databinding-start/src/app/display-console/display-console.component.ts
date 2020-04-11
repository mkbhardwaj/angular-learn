import { Component, 
  OnInit, 
  Input,
  ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-display-console',
  templateUrl: './display-console.component.html',
  styleUrls: ['./display-console.component.css'],
  //encapsulation=ViewEncapsulation.Emulated // we can change the default encapsulation of the view by 
  // using this property.
})
export class DisplayConsoleComponent implements OnInit {
 
 @Input('serverelem') element:{type:string,name:string,content :string};
 // we want this property 'element' to be bindable from outside (from some other component ) for which we have to 
 // have to decorate it with @Input('alias will come here')
 
  constructor() { }

  ngOnInit(): void {
  }

}
