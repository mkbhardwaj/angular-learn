import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultval:string='advance';
  @ViewChild('f',{static:false}) formObj:NgForm;
  onSubmit(){
    console.log(
      this.formObj.value.email +
      this.formObj.value.subscription+
      this.formObj.value.password);
  }
}
