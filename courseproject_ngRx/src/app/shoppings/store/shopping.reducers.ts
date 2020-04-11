import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as shoppingAction from './shopping.action';



export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [new Ingredient('apples', 5), new Ingredient('tomatto', 3)],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingsReducer(state = initialState, action: shoppingAction.ShoppingActions) {
    switch (action.type) {
        case shoppingAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case shoppingAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case shoppingAction.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            let updatedIngredient = { ...ingredient, ...action.payload.ingredient }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;
            return {
                ...state, ingredients: [...updatedIngredients]
            }
        case shoppingAction.DELETE_INGREDIENT:

            return {
                ...state, ingredients: state.ingredients.filter((ig, index) => {
                    if (action.payload != index) {
                        return true;
                    }
                })
            }
        case shoppingAction.START_EDIT:

            return {
                ...state, editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            }

        case shoppingAction.STOP_EDIT:

            return {
                ...state, editedIngredientIndex: -1, editedIngredient: null
            }


        default:
            return state;
        // state change should be immutable

    }
}