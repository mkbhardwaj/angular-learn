import {
  Component, OnInit,

} from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingActions from '../../shoppings/store/shopping.action';
import * as formApp from '../../store/app.reduces';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private router: ActivatedRoute, private r: Router,
    private store: Store<formApp.AppState>) {

  }
  ngOnInit(): void {
    // this.router.params.subscribe((data: any) => {
    //   this.id = +data['id'];
    //  // this.recipe = this.recipeService.getRecipe(this.id);
    // });
    
    this.router.params.pipe(map((data: any) => {
      this.id = +data['id'];
      return data['id'];
    }), switchMap((id) => {
      return this.store.select('recipies');
    }),map(recipieState=> {
      console.log('here'+recipieState.recipies);
     return recipieState.recipies.find((recipe,index)=>{
        return index===this.id;
      })
    })).subscribe(recipie => {
      this.recipe=recipie;
    });

  }
  addShoppingList() {
    this.recipeService.addIngredientstoShoppingList(this.recipe.ingredients);
    this.store.dispatch(new shoppingActions.AddIngredients(this.recipe.ingredients));
  }
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.r.navigate(['/recipes']);
  }

}
