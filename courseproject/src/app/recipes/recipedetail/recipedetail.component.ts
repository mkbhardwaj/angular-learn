import {
  Component, OnInit,

} from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private router: ActivatedRoute,private r:Router) {

  }
  ngOnInit(): void {
    this.router.params.subscribe((data: any) => {
      this.id = +data['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });

    
  }
  addShoppingList() {
    this.recipeService.addIngredientstoShoppingList(this.recipe.ingredients);
  }
  deleteRecipe()
  {
    this.recipeService.deleteRecipe(this.id);
    this.r.navigate(['/recipes']);
  }

}
