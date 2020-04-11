import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,tap, catchError } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable({
  providedIn: 'root'
})
// we don't have to add this in providers of the app module -- 
export class DataServicesService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }
  storeRecipes() {
    this.http.put('https://courseproject-61c83.firebaseio.com/recipes.json', this.recipeService.getRecipes()).subscribe(response => { console.log(response) });
  }
  fetchRecipes() {
   return this.http.get<Recipe[]>('https://courseproject-61c83.firebaseio.com/recipes.json').pipe(map(rs => {
      return rs.map(r => {
        return { ...r, ingredients: r.ingredients ? r.ingredients : [] }
      });
    }),
    catchError(error=>{
      console.log(error);
      return []; // this has been done temporary
    }),
    tap(recipes=>{
      this.recipeService.updateRecipes(recipes);
    }));
  }
}