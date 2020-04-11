import {Component } from '@angular/core';

@Component({
    selector:'app-success-alert',
    template:`<p> 
        This is a success alert</p>`,
    styles:[`p{
        color:green;
        padding: 20px;
        border-radius:10px;
        background-color:lightgreen;
    }`]
})

export class SuccessAlertComponent {

}