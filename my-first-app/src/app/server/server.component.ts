import {Component} from '@angular/core';

@Component({
    selector:'app-server',
    templateUrl:'./server.component.html',
    styles:[`.online {
        background-color:red;
    }`]
})
export class ServerComponent  {
serverId: number = 10;
status: string ='offline';

constructor(){
    this.status=Math.random()>0.5?'online':'offline';
}
getServerStatus(){
    return this.status;
}
getStyle()
{
    return this.status=='online'? 'green':'red';
}
} 