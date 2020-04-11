import {
  Component, OnInit,
  EventEmitter, Output, OnDestroy
} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reduces';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit,OnDestroy{
  recipes: Recipe[];
  recipeChangeSubs:Subscription;
  //@Output('selectrecipe') selectedRecipe = new EventEmitter<Recipe>();
  constructor(private recipeServices:RecipeService,private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.recipes=this.recipeServices.getRecipes();
    this.recipeChangeSubs = this.store.select('recipies').pipe(map(recipieState=>{
      return recipieState.recipies;
    })).subscribe(r=>{
      this.recipes=r;
    })
    //  //this.store.recipeChange.subscribe((r:Recipe[])=>{
    //   this.recipes=r;
    // });
  }
  ngOnDestroy(){
    this.recipeChangeSubs.unsubscribe();
  }
  // onRecipeSelect(recipe) {
  //   this.selectedRecipe.emit(recipe);
  // }
}
