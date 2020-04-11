import { Ingredient } from '../shared/ingredient.model';
export class Recipe{
 public name:string;
 public description: string ;
 public imageUrl: string ;
 public ingredients:Ingredient[];
 constructor(name:string,description:string,imageurl:string,ingredients:Ingredient[]){
this.name=name;
this.description=description;
this.imageUrl=imageurl;
this.ingredients=ingredients;
 }
}