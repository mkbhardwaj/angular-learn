import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { DropDownDirective } from './dropdown.directive';
import { PlaceHolderDirective } from './placeholder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingComponent,
        DropDownDirective,
        PlaceHolderDirective
    ],
    imports:[
        CommonModule,
    ],
    exports:[
        AlertComponent,
        LoadingComponent,
        DropDownDirective,
        PlaceHolderDirective,
        CommonModule
    ]
})
export class SharedModule { }