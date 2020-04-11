import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE='[recipe] add recipe';
export const UPDATE_RECIPE='[recipe] update recipe';
export const DELETE_RECIPE='[recipe] delete recipe';
export const SET_RECIPES='[recipe] set recipes';
export const PUSH_RECIPE='[recipe] push recipes';
export const FETCH_RECIPES='[recipe] fetch recipies'

export class SetRecipes implements Action{
  readonly  type:string =SET_RECIPES;
  constructor(public payload:Recipe[]){

  }
}
export class FetchRecipes implements Action{
    readonly  type:string =FETCH_RECIPES;
}

export type RecipeActions =SetRecipes|FetchRecipes;