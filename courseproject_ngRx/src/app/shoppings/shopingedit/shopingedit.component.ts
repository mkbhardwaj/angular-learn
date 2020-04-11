import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { ShoppinglistService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AddIngredient } from '../store/shopping.action';
import * as ShoppingsAction from '../store/shopping.action';
import * as formApp from '../../store/app.reduces';

@Component({
  selector: 'app-shopingedit',
  templateUrl: './shopingedit.component.html',
  styleUrls: ['./shopingedit.component.css']
})
export class ShopingeditComponent implements OnInit, OnDestroy {
  // @ViewChild('inputfieldname') name:ElementRef;
  // @ViewChild('inputfieldamount') amount:ElementRef;
  //@Output('addIngredient') ingredient=new EventEmitter<{name:string,amount :number}>();
  @ViewChild('formRef') formRef: NgForm;
  selectIngredientSubs: Subscription;
  editMode: boolean = false;
  editId: number;
  constructor(private shoppingService: ShoppinglistService,
    private store: Store<formApp.AppState>) { }

  ngOnInit(): void {
    this.selectIngredientSubs = this.store.select('shoppings').subscribe(state => {
      if (state.editedIngredientIndex > -1) {
        var t = state.editedIngredient;
        this.formRef.setValue({
          name: t.name,
          amount: t.amount
        });
        this.editMode = true;
        this.editId = state.editedIngredientIndex;
      }
    })
    //this.selectIngredientSubs =this.shoppingService.selectedIngredient.subscribe((data: number) => {
    //   var t = this.shoppingService.getIngredient(data);
    //   this.formRef.setValue({
    //     name: t.name,
    //     amount: t.amount
    //   });
    //   this.editMode = true;
    //   this.editId = data;
    // });
  }
  addIngredient() {
    //this.shoppingService.addIngredient({name:this.name.nativeElement.value,amount:this.amount.nativeElement.value});
    if (this.editMode) {
      this.store.dispatch(new ShoppingsAction.UpdateIngredient({ index: this.editId, ingredient: new Ingredient(this.formRef.value.name, this.formRef.value.amount) }));
      this.shoppingService.editIngredient(this.formRef.value.name, this.formRef.value.amount, this.editId);
      this.editId = null;
      this.editMode = false;

    } else {
      this.shoppingService.addIngredient({ name: this.formRef.value.name, amount: this.formRef.value.amount });
      this.store.dispatch(new ShoppingsAction.AddIngredient(new Ingredient(this.formRef.value.name, this.formRef.value.amount)));
    }

    this.formRef.reset();

    //this.ingredient.emit({name:this.name.nativeElement.value,amount:this.amount.nativeElement.value});
  }

  deleteIngredient() {
    this.shoppingService.removeIngredient(this.editId);
    this.formRef.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingsAction.DeleteIngredient(this.editId));
  }

  clearForm() {
    this.formRef.reset();
    this.store.dispatch(new ShoppingsAction.StopEdit()); // dispatch one more action
    this.editMode = false;
  }
  ngOnDestroy() {
    this.selectIngredientSubs.unsubscribe();
    this.store.dispatch(new ShoppingsAction.StopEdit()); // dispatch one more action

  }
}
