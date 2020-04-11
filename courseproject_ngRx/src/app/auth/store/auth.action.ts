import { User } from '../user.model';
import { Action } from '@ngrx/store';

export const LOGIN='LOGIN'; // we will reuse this in the signup as well
export const LOGOUT='LOGOUT';
export const START_LOGIN='[auth] start login';
export const LOGIN_FAILED='[auth] login failed'; //we will reuse this in the signup as well

export const SIGNUP_START='[auth] sign up start';
export const AUTO_LOGIN='[auth] auto login';


export class LoginAction implements Action {
    readonly type=LOGIN;
    constructor(public payload:User){

    }
}

export class LogoutAction implements Action {
    readonly type=LOGOUT;
    constructor(){

    }
}

export class StartLoginAction implements Action {
    readonly type=START_LOGIN;
    constructor(public payload:{email:string,password:string}){

    }
}
export class LoginFailedAction implements Action {
    readonly type=LOGIN_FAILED;
    constructor(public payload:string){

    }
}

export class SignUpStart implements Action {
    readonly type=SIGNUP_START;
    constructor(public payload:{email:string,password:string}){

    }
}
export class AutoLogin implements Action {
    readonly type=AUTO_LOGIN;
    
}

export type AuthActions = LoginAction|  LogoutAction | StartLoginAction | LoginFailedAction | SignUpStart | AutoLogin;