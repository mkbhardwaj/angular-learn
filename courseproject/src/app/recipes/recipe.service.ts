import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shoppings/shoppinglist.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public selectedRecipe = new Subject<Recipe>();
  public recipeChange = new Subject<Recipe[]>();


  private recipes: Recipe[] = [];
  // [
  // new Recipe(
  //   'sandwich',
  //   'test',
  //   'https://upload.wikimedia.org/wikipedia/commons/0/0b/Recipe_Unlimited_logo.png'
  //   , [new Ingredient('bread', 2), new Ingredient('tomatto', 1), new Ingredient('salt', 1)]),
  // new Recipe('smoothie',
  //   'test',
  //   'https://upload.wikimedia.org/wikipedia/commons/0/0b/Recipe_Unlimited_logo.png',
  //   [new Ingredient('milk', 1), new Ingredient('icecream', 1), new Ingredient('cream', 2)])
  //];
  constructor(private shoppingService: ShoppinglistService) { }
  public getRecipes() {
    return this.recipes.slice(); // returning a copy of the array
  }
  public addIngredientstoShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }
  public getRecipe(id) {
    return this.recipes[id];
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes.slice());
  }

  public updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;

    this.recipeChange.next(this.recipes.slice());
  }

  public deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChange.next(this.recipes.slice());
  }

  public updateRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChange.next(this.recipes.slice());
  }


}
