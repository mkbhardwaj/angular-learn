import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //selector: '[app-servers]', // attribute selector
  //selector: '.app-servers', // class selector
  templateUrl:'./servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer:boolean=false;
  serverCreationStatus:string="Not Created!"
  serverName:string='Test';
  isServerCreated:boolean = false;
  serverList =['Test Server','Test Server 2'];
    constructor() { 
    setInterval(()=>{this.allowNewServer=true},2000);
  }

  ngOnInit(): void {
  }
  onServerCreation(){
    this.serverCreationStatus="Server Created. Name is "+ this.serverName;
    this.serverList.push(this.serverName);
    this.isServerCreated=true;
  }
  onUpdateServerName(event:any){
    this.serverName= (<HTMLInputElement>event.target).value
  }
}
