import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reduces';
import * as authActions from './auth/store/auth.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   constructor(private authService:AuthService,private store:Store<fromApp.AppState>)
   {}
   ngOnInit(){
     //this.authService.autoLogin();
     this.store.dispatch(new authActions.AutoLogin());
   }
}
