import { Component, OnInit } from '@angular/core';
import { UserserviceService } from './userservice.service';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeUsers = [];
  inactiveUsers = [];
  
  constructor(private userservice:UserserviceService,private counterservice:CounterService)
  {}
  ngOnInit(){
    this.activeUsers=this.userservice.activeUsers;
    this.inactiveUsers=this.userservice.inactiveUsers;
   

  }
}

