import { CanActivate, ActivatedRoute, RouterState, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reduces';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router,private store:Store<fromApp.AppState>) { }
    // url tree is a new feature introduced to allow user to navigate to some other action
    // take(1) subscription automatically unsubscribed after one value fetch
    canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
        return this.store.select('auth').pipe(take(1),map(authState=>{return authState.user;}) ,map(user => {
            let isAuth = user!=null?!!user.token:false;
            if (isAuth) {
                return isAuth;
            } 
                return this.router.createUrlTree(['/auth']);
            
        }));
    }
}