import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { RecipestartComponent } from  './recipestart/recipestart.component';
import { RecipedetailComponent } from './recipedetail/recipedetail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe-resolver';
import { AuthGuardService } from '../auth/authguard';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
    {
      path: '', component: RecipesComponent, children: // we removed this path for lazy loading 
        [
          {
            path: '',
            component: RecipestartComponent,
            //resolve: [RecipeResolverService],
            canActivate: [AuthGuardService]
          },
          {
            path: 'new',
            component: RecipeEditComponent,
            resolve: [RecipeResolverService],
            canActivate: [AuthGuardService]
          },
          {
            path: ':id',
            component: RecipedetailComponent,
            resolve: [RecipeResolverService],
            canActivate: [AuthGuardService]
          },
          {
            path: ':id/edit',
            component: RecipeEditComponent,
            resolve: [RecipeResolverService],
            canActivate: [AuthGuardService]
          }
        ]
    }];
  
@NgModule(
{
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
}
)

export class RecipeRouteModule{

}