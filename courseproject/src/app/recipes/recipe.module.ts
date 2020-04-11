import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeitemComponent } from './recipelist/recipeitem/recipeitem.component';
import { RecipedetailComponent } from './recipedetail/recipedetail.component';
import { RecipestartComponent } from './recipestart/recipestart.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeRouteModule } from './recipes.routemodule';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        RecipesComponent,
        RecipelistComponent,
        RecipedetailComponent,
        RecipeitemComponent,
        RecipestartComponent,
        RecipeEditComponent,
        
    ],
    exports:
        [
            RecipeRouteModule
        ],
    imports:[
        CommonModule,
        FormsModule,
        RecipeRouteModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class RecipeModule {

}