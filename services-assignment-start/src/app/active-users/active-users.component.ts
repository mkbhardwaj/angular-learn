import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  @Input() users: string[];
 
  constructor(private userservice: UserserviceService) { }
  onSetToInactive(id: number) {
    this.userservice.onSetToInactive(id);
    //this.userSetToInactive.emit(id);
  }
}
