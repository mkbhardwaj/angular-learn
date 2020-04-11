
import { Action } from '@ngrx/store';
import { User } from '../user.model';
import * as authActions from './auth.action';
import { StartEdit } from 'src/app/shoppings/store/shopping.action';

export interface State {
    user: User,
    authError:string,
    loading:boolean
};

const user: State = { user: null,authError:null,loading:false };
export function authReducer(state: State = user, action: authActions.AuthActions) {
    switch (action.type) {
        case authActions.LOGIN:
            return { ...state,user:action.payload,authError:null,loading:false };
            break;
        case authActions.START_LOGIN:
            return{...state,authError:null,loading:true}
        case authActions.LOGOUT:
            return {...state,user:null};
        case authActions.LOGIN_FAILED:
            return {...state,user:null,authError:action.payload ,loading:false}
        case authActions.SIGNUP_START:
            return{...state,authError:null,loading:true}
        default:
            return { ...state };
    }

}