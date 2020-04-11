import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 isDisplay: boolean=false;
 buttonClicked=[];
 toggledisplay(){
   this.isDisplay=!this.isDisplay;
   this.buttonClicked.push(this.buttonClicked.length+1);
   return this.isDisplay;
 }
 getColor(i){
  if(i>5){
    return 'blue';
  }else{
    return 'white';
  }
 }
}
