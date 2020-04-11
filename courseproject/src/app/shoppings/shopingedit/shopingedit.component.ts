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
  constructor(private shoppingService: ShoppinglistService) { }

  ngOnInit(): void {
    this.selectIngredientSubs = this.shoppingService.selectedIngredient.subscribe((data: number) => {
      var t = this.shoppingService.getIngredient(data);
      this.formRef.setValue({
        name: t.name,
        amount: t.amount
      });
      this.editMode = true;
      this.editId = data;
    });
  }
  addIngredient() {
    //this.shoppingService.addIngredient({name:this.name.nativeElement.value,amount:this.amount.nativeElement.value});
    if (this.editMode) {
      this.shoppingService.editIngredient(this.formRef.value.name, this.formRef.value.amount, this.editId);
      this.editId = null;
      this.editMode = false;
    } else {
      this.shoppingService.addIngredient({ name: this.formRef.value.name, amount: this.formRef.value.amount });
    }

    this.formRef.reset();

    //this.ingredient.emit({name:this.name.nativeElement.value,amount:this.amount.nativeElement.value});
  }

  deleteIngredient(){
    this.shoppingService.removeIngredient(this.editId);
    this.formRef.reset();
    this.editMode=false;
  }
 
  clearForm(){
    this.formRef.reset();
    this.editMode=false;
  }
  ngOnDestroy() {
    this.selectIngredientSubs.unsubscribe();
  }
}
