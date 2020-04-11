import {
    Component,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';

import { DataServicesService } from '../shared/data-services.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reduces';
import * as fromAuthAction from '../auth/store/auth.action';
import * as recipeAuthAction from '../recipes/store/recipe.action';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class HeaderComponent implements OnInit {
    isAuthenticated:boolean=false;
    // output variable to emit event.
    ngOnInit(){
        this.store.select('auth').pipe(map(authState=>{return authState.user})).subscribe(user=>{
        
        if(user)
        {
           this.isAuthenticated=!!user.token;
        }else{
            this.isAuthenticated=false;
        }
        });
    }
    constructor(private dataService: DataServicesService,private authService:AuthService,
        private store:Store<fromApp.AppState>) { }
    saveData() {
        this.dataService.storeRecipes();
    }
    fetchData() {
        this.store.dispatch(new recipeAuthAction.FetchRecipes());
        // this.dataService.fetchRecipes().subscribe(recipes=>{
        //     console.log(recipes);
        // });
    }
    logout(){
        this.store.dispatch(new fromAuthAction.LogoutAction());
        //this.authService.logOut();
    }
}