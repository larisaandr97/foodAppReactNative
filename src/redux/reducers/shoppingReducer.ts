import { ShoppingAction } from '../actions'
import { FoodAvailability, ShoppingState, FoodModel } from '../models'

const initialState = {
    availability: {} as FoodAvailability,
    availableFoods: {} as [FoodModel]
}

const ShoppingReducer = (state: ShoppingState = initialState, action: ShoppingAction) => {

    const { type, payload } = action;

    switch (type) {
        case 'ON_AVAILABILITY':
            return {
                ...state,
                availability: payload
            }
        case 'ON_FOODS_SEARCH':
            return {
                ...state,
                availableFoods: payload
            }
        default:
            return state
    }

}
export { ShoppingReducer }