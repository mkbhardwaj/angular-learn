import {  Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as recipeAction from './recipe.action';

// we are taking the object as there will be multiple state in out project 
export interface State{
    recipies:Recipe[],
}
const initialState:State={
    recipies:[],
    
};

export function recipeReducer(state=initialState, action) {
    switch (action.type) {
        case recipeAction.SET_RECIPES:
            return {...state,recipies:[...action.payload]}
        default:
            return state;
    }
}