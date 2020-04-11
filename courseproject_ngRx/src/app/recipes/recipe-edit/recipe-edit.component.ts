import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reduces';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeEditForm: FormGroup;

  constructor(private router: ActivatedRoute, private recipeService: RecipeService,private r: Router,private store:Store<AppState>) { }

  ngOnInit(): void {
   
    this.router.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = +params['id'];
        this.editMode = true;
      }
      this.initForm();
    });
    
  }
  addRecipe() {

    console.log(this.recipeEditForm.value);
    let r = new Recipe(this.recipeEditForm.value.name,
      this.recipeEditForm.value.description,
      this.recipeEditForm.value.imageurl,
      this.recipeEditForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, r);

    } else {

      this.recipeService.addRecipe(r);
    }
    console.log(
      this.recipeEditForm.value['ingredients']);
   this.r.navigate(['/recipes']);
  }
  initForm() {
    
    let recipename = '';
    let recipedescription = '';
    let recipeimageurl = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.store.select('recipies').pipe(map( rs=>{
        return rs.recipies.find((recipe,index)=>{
          return index===this.id;
        });
      })).subscribe(recipe=>{
        recipename = recipe.name;
        recipedescription = recipe.description;
        recipeimageurl = recipe.imageUrl;
        if (recipe['ingredients']) {
          for (let i of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup(
                {
                  'name': new FormControl(i.name, Validators.required),
                  'amount': new FormControl(i.amount, [Validators.required, Validators.pattern('[1-9]+[0-9]*')])
                }
              ));
          }
        }
      
      this.recipeEditForm = new FormGroup({
        'name': new FormControl(recipename, Validators.required),
        'description': new FormControl(recipedescription, Validators.required),
        'imageurl': new FormControl(recipeimageurl, Validators.required),
        'ingredients': recipeIngredients
      });
      });
    }
     // let recipe = this.recipeService.getRecipe(this.id);
      
  }

  getRecipeControls() {
    //console.log((<FormArray>this.recipeEditForm.get("ingredients")).controls);
    return (<FormArray>this.recipeEditForm.get("ingredients")).controls;
  }
  
  removeIngredient(index:number){
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }

  addIngredient() {
    // when using control.push we are not able to fetch the value .
    //(<FormArray>this.recipeEditForm.get('ingredients')).control.push
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      new FormGroup(
        {
          'name': new FormControl('', Validators.required),
          'amount': new FormControl('', [Validators.required, Validators.pattern('[1-9]+[0-9]*')])
        }
      ));
  }

  cancel(){
    this.r.navigate(['/recipes']);
  }
}
