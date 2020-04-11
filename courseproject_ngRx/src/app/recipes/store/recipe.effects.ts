import { Actions, ofType, Effect } from '@ngrx/effects';
import * as fromRecipie from './recipe.action';
import { switchMap, map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import * as fromRecipe from '../store/recipe.action';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffect{
   
    constructor(private actions$: Actions,private http:HttpClient){
    
    }
    @Effect()
    fetchRecipes=this.actions$.pipe(ofType(fromRecipie.FETCH_RECIPES),switchMap(()=>{
      
        return this.http.get<Recipe[]>('https://courseproject-61c83.firebaseio.com/recipes.json').pipe(map(rs => {
            return rs.map(r => {
              return { ...r, ingredients: r.ingredients ? r.ingredients : [] }
            });
          }))
    }),map(recipes=> {
        return new fromRecipie.SetRecipes(recipes);
    }))
}