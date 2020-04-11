import {
  Component, OnInit,
  EventEmitter, Output, OnDestroy
} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit,OnDestroy{
  recipes: Recipe[];
  recipeChangeSubs:Subscription;
  //@Output('selectrecipe') selectedRecipe = new EventEmitter<Recipe>();
  constructor(private recipeServices:RecipeService) { }

  ngOnInit(): void {
    this.recipes=this.recipeServices.getRecipes();
    this.recipeChangeSubs = this.recipeServices.recipeChange.subscribe((r:Recipe[])=>{
      this.recipes=r;
    });
  }
  ngOnDestroy(){
    this.recipeChangeSubs.unsubscribe();
  }
  // onRecipeSelect(recipe) {
  //   this.selectedRecipe.emit(recipe);
  // }
}
