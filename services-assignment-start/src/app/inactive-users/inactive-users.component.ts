import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  @Input() users: string[];
  
  constructor(private userservice:UserserviceService){}
  onSetToActive(id: number) {
    this.userservice.onSetToActive(id);
  }
}
