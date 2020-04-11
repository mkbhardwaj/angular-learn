import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import {take, exhaustMap,map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reduces';


@Injectable()
export class AuthInterCeptorServerice implements HttpInterceptor {
    constructor(private authService:AuthService,private store:Store<fromApp.AppState>){}
    // exhaust map is used when we have to work with two observables .. in this case we have to fetch the value from the user subject and we have to return the observable. that is only possible when we somehow wait till we get the user value. 
    intercept(req: HttpRequest<any>, handler: HttpHandler) {
        
       return this.store.select('auth').pipe(take(1),map(authState=> {return authState.user}), exhaustMap(user=>{
           if(user){
          let modifiedReq=req.clone({
              params: new HttpParams().set('auth',user.token)
          });
          return handler.handle(modifiedReq);
        }else{
         return handler.handle(req);
        }
        }));
        
    }
}