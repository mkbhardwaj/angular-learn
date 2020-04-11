import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ArgumentOutOfRangeError } from 'rxjs';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.component.html',
  styleUrls: ['./shoppings.component.css']
})
export class ShoppingsComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subs: Subscription;
  constructor(private shoppingService: ShoppinglistService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.subs = this.shoppingService.ingredientsChanged.subscribe((i: Ingredient[]) => {
      this.ingredients = i;
    });
  }

  onAddIngredient(a: { name: string, amount: number }) {
    this.ingredients.push(new Ingredient(a.name, a.amount));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  selectIngredient(i:number)
  {
    this.shoppingService.selectedIngredient.next(i);
  }
}

