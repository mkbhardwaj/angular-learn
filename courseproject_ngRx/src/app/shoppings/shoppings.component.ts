import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ArgumentOutOfRangeError, Observable } from 'rxjs';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reduces';
import * as shoppingsAction from './store/shopping.action';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.component.html',
  styleUrls: ['./shoppings.component.css']
})
export class ShoppingsComponent implements OnInit, OnDestroy {
  //ingredients: Ingredient[];
  ingredients: Observable<{ingredients: Ingredient[]}>;
  constructor(private shoppingService: ShoppinglistService,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients= this.store.select('shoppings')
    // this.ingredients = this.shoppingService.getIngredients();
    // this.subs = this.shoppingService.ingredientsChanged.subscribe((i: Ingredient[]) => {
    //   this.ingredients = i;
    // });
  }

  onAddIngredient(a: { name: string, amount: number }) {
   // this.ingredients.push(new Ingredient(a.name, a.amount));
  }
  ngOnDestroy() {
    //this.subs.unsubscribe();
  }
  selectIngredient(i:number)
  {
    this.store.dispatch(new shoppingsAction.StartEdit(i));
    //this.shoppingService.selectedIngredient.next(i);
  }
}

