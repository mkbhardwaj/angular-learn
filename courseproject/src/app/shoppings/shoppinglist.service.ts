import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppModule } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingredientsChanged=new Subject<Ingredient[]>();
  selectedIngredient=new Subject<number>();
  private ingredients:Ingredient[] =[new Ingredient('apples',5),new Ingredient('tomatto',3)];
  constructor() { }
  addIngredient(i:{name:string,amount:number}){
    this.ingredients.push(new Ingredient(i.name,i.amount));
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  getIngredients()
  {
    return this.ingredients.slice();
  }
  addIngredients(i:Ingredient[]){
    this.ingredients.push(...i);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  getIngredient(id:number)
  {
    return this.ingredients[id];
  }
  editIngredient(name:string,amount:number,id:number){
    this.ingredients[id].name=name;
    this.ingredients[id].amount=amount;
    this.ingredientsChanged.next(this.ingredients.slice());
  } 
  removeIngredient(id:number){
    this.ingredients.splice(id,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
