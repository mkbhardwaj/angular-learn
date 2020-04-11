import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reduces';
import * as fromAuth from './store/auth.action';
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  timerHolder:any;
  //userSubject = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router,
    private store:Store<fromApp.AppState>) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvZJOnX0_82kE3EhiO11D4691J0cmJHwQ',
      { email: email, password: password, returnSecureToken: true }
    ).pipe(catchError(err => {
      let errorMessage = "Unknown error message!";
      if (err.error || err.error.error) {
        switch (err.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'Email alredy exists!';
            break;
          default:
            errorMessage = err.error.error.message;
            break;
        }
      } else {
      }
      return throwError(errorMessage);
    }), tap(resData => {
      const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, expirationDate);
    }));
  }
  signin(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvZJOnX0_82kE3EhiO11D4691J0cmJHwQ',
      { email: email, password: password, returnSecureToken: true }
    ).pipe(catchError(err => {
      let errorMessage = "Unknown error message!";
      if (err.error || err.error.error) {
        switch (err.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'Email alredy exists!';
            break;
          default:
            errorMessage = err.error.error.message;
            break;
        }
      } else {
      }
      return throwError(errorMessage);
    }), tap(resData => {
      const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, expirationDate);
    }));
  }
  private handleAuthentication(email: string, id: string, token: string, expiration: Date) {
    const user = new User(email, id, token, expiration);
    
    //this.userSubject.next(user);
    this.store.dispatch(new fromAuth.LoginAction(user));
    localStorage.setItem('userData', JSON.stringify(user));
    
    let time=new Date(expiration).getTime()-new Date().getTime();
    this.autoLogout(time);
  }

  logOut() {
    this.store.dispatch(new fromAuth.LogoutAction());
    //this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    clearInterval(this.timerHolder);
  }

  autoLogin() {
    let u = JSON.parse(localStorage.getItem('userData'));
    if (u) {
      if (new Date() > new Date(u.expirationDate)) {
        return;
      } else {
        let time=new Date(u._tokenExpirationDate).getTime()-new Date().getTime();
        
        this.store.dispatch(new fromAuth.LoginAction(new User(u.email, u.id, u._token, new Date(u._tokenExpirationDate))));
        //this.userSubject.next(new User(u.email, u.id, u._token, new Date(u._tokenExpirationDate)));
        this.autoLogout(time);
      }
    }
  }
  autoLogout(expirationTime: number) {
   this.timerHolder= setTimeout(() => {
      this.logOut();
    }, expirationTime)
  }
  clearLogoutTimer(){
    if(this.timerHolder){
      clearInterval(this.timerHolder);
      this.timerHolder=null;
    }
  }
}

// we can have a separate method to handle the errors! ->