import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Actions,ofType} from '@ngrx/effects';
import { Recipe } from './recipe.model';
import { DataServicesService } from '../shared/data-services.service';
import {RecipeService } from '../recipes/recipe.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reduces';
import * as recipeActions from '../recipes/store/recipe.action';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private store: Store<AppState>,private recipeService : RecipeService,private actions$ :Actions) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new recipeActions.FetchRecipes());
        return this.actions$.pipe(ofType(recipeActions.SET_RECIPES),take(1)
        );
    }
}