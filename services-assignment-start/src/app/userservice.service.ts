import { Injectable } from '@angular/core';
import {CounterService } from './counter.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];
  constructor(private counterservice:CounterService) { }

  onSetToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.counterservice.incrementInactive();
    this.activeUsers.splice(id, 1);
  }

  onSetToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.counterservice.incrementActive();
    this.inactiveUsers.splice(id, 1);
  }
}
