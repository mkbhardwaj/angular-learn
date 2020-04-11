import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';

// ordser of the routes is very important in this array as it is selected from top to bottom by the angular.

const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule) },
  { path: 'shoppings', loadChildren: () => import('./shoppings/shopping.module').then(m => m.ShoppingModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
  
  // lazy loading ..
  // { path: 'not-found', component: ErrorpageComponent, data: { 'message': 'Page not found!' } },
  // { path: '**', redirectTo: '/not-found' } // wildcard for all the routes other than what is configured here 

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
