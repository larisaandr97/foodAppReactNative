import { ShoppingAction } from '../actions'
import { FoodAvailability, ShoppingState } from '../models'

const initialState = {
    availability: {} as FoodAvailability
}

const ShoppingReducer = (state: ShoppingState = initialState, action: ShoppingAction) => {

    const { type, payload } = action;

    switch (type) {
        case 'ON_AVAILABILITY':
            return {
                ...state,
                availability: payload
            }
        default:
            return state
    }

}
export { ShoppingReducer }