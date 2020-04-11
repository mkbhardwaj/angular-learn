import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataServicesService } from '../shared/data-services.service';
import {RecipeService } from '../recipes/recipe.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataService: DataServicesService,private recipeService : RecipeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let r=this.recipeService.getRecipes();
        if(r.length==0)
        {
       return this.dataService.fetchRecipes()
        }else{
            return r;
        }
    }
}