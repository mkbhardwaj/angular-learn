import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppinglistService } from './shoppings/shoppinglist.service';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { RecipeService } from './recipes/recipe.service';
import {  AuthInterCeptorServerice } from './auth/auth.interceptor';
import { RecipeModule } from './recipes/recipe.module';
import { ShoppingModule } from './shoppings/shopping.module';
import {SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorpageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    //RecipeModule,  do not import a module which we are loading lazyly
    
    SharedModule,
     // we have created a separate module to make our app more lenient and easy to manage
  ],
  providers: [
    ShoppinglistService,
    RecipeService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterCeptorServerice,multi:true}
  ]
    ,
  bootstrap: [AppComponent]
})
export class AppModule { }
