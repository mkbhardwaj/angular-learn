import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ManageConsoleComponent } from './manage-console/manage-console.component';
import { DisplayConsoleComponent } from './display-console/display-console.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageConsoleComponent,
    DisplayConsoleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
