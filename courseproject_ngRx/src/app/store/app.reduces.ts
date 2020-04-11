import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppings from '../shoppings/store/shopping.reducers';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipe from '../recipes/store/recipe.reducer';

export interface AppState {
    shoppings: fromShoppings.State,
    auth: fromAuth.State,
    recipies:fromRecipe.State
};


export const appReducer: ActionReducerMap<AppState> =
{
    shoppings: fromShoppings.shoppingsReducer,
    auth: fromAuth.authReducer,
    recipies:fromRecipe.recipeReducer
}
;

