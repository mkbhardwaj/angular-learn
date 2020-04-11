import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  activetoinactivecount=0;
  inactivetoactivecount=0;
  constructor() { }
  public incrementActive(){
    this.inactivetoactivecount++;
    console.log("In-active to active count: "+ this.inactivetoactivecount);
  }
  
  public incrementInactive(){
    this.activetoinactivecount++;
    console.log("active to In-active count: "+ this.activetoinactivecount);
  }
}
