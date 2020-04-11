import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';
import * as fromAuthAction from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}
const handleAuth = (resData: AuthResponseData) => {

    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    let tempu = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(tempu));
    return new fromAuthAction.LoginAction(tempu);

};
const handleError = (error) => {
    let errorMessage = '';
    switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'Email alredy exists!';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Password is not correct! Please try again.';
            break;
        default:
            errorMessage = error.error.error.message;
            break;
    }
    return of(new fromAuthAction.LoginFailedAction(errorMessage));
};

@Injectable()
export class AuthEffect {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(fromAuthAction.START_LOGIN)
        , switchMap((authData: fromAuthAction.StartLoginAction) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true }
            ).pipe(tap(resData => {
                this.authSerivce.autoLogout(+resData.expiresIn * 1000);
            }), map((resData: AuthResponseData) => {
                return handleAuth(resData);
            }));
        }), catchError(error => {
            //run error handling code and return non errorneous observable otherwise it 
            // create new observable without error
            return handleError(error);
        }),
    );

    @Effect()
    authSignUp = this.actions$.pipe(ofType(fromAuthAction.SIGNUP_START), switchMap((authData: fromAuthAction.SignUpStart) => {

        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvZJOnX0_82kE3EhiO11D4691J0cmJHwQ',
            { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true }
        ).pipe(tap(resData => {
            this.authSerivce.autoLogout(+resData.expiresIn * 1000);
        }), map((resData) => {
            return handleAuth(resData);
        }), catchError(error => {
            return handleError(error);
            // let errorMessage = '';
            // switch (error.error.error.message) {
            //     case 'EMAIL_EXISTS':
            //         errorMessage = 'Email alredy exists!';
            //         break;
            //     case 'INVALID_PASSWORD':
            //         errorMessage = 'Password is not correct! Please try again.';
            //         break;
            //     default:
            //         errorMessage = error.error.error.message;
            //         break;
            // }
            // return of(new fromAuthAction.LoginFailedAction(errorMessage));
        })
        )
    })
    );
    @Effect({
        dispatch: false
    })
    authRedirect = this.actions$.pipe(ofType(fromAuthAction.LOGIN), tap(() => {

        this.router.navigate(['/']);
    }));
    @Effect({
        dispatch: false
    })
    authRedirectLogout = this.actions$.pipe(ofType(fromAuthAction.LOGOUT), tap(() => {
        this.router.navigate(['/auth']);
    }));

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(ofType(fromAuthAction.LOGOUT), tap(() => {
        localStorage.removeItem('userData');
        this.authSerivce.clearLogoutTimer();
    }));
    @Effect()
    autoLogin = this.actions$.pipe(ofType(fromAuthAction.AUTO_LOGIN), map(() => {
        let u = JSON.parse(localStorage.getItem('userData'));

        if (u) {
            if (new Date() > new Date(u.expirationDate)) {
                return { type: 'dummy' };
            } else {
                let time = new Date(u._tokenExpirationDate).getTime() - new Date().getTime();
                this.authSerivce.autoLogout(+time * 1000);
                let user = new User(u.email, u.id, u._token, new Date(u._tokenExpirationDate));

                return new fromAuthAction.LoginAction(user);
                //this.userSubject.next(new User(u.email, u.id, u._token, new Date(u._tokenExpirationDate)));
                //this.autoLogout(time);
            }
        }
        return { type: 'dummy' }
    }
    )
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router,
        private authSerivce: AuthService) {

    }



}

