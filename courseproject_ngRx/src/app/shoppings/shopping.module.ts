import { NgModule } from '@angular/core';
import { ShoppingsComponent } from './shoppings.component';
import { ShopingeditComponent } from './shopingedit/shopingedit.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [
    { path: '', component: ShoppingsComponent },
];
@NgModule({
    declarations: [
        ShoppingsComponent,
        ShopingeditComponent,
    ],
    imports: [ReactiveFormsModule, FormsModule, RouterModule.forChild(routes), SharedModule
    ],
    exports: [RouterModule]
})
export class ShoppingModule {

}