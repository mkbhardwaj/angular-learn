import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes:Routes=[ { path: '', component: AuthComponent }];
@NgModule({
    declarations:[AuthComponent],
    imports:[FormsModule,SharedModule,RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AuthModule{

}