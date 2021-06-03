
import { UserAction } from '../actions'
import { UserModel, UserState, FoodModel } from '../models'
import { LocationGeocodedAddress } from 'expo-location'

const initialState: UserState = {
    user: {} as UserModel,
    location: {} as LocationGeocodedAddress,
    error: undefined,
    Cart: {} as [FoodModel]
}

const UserReducer = (state: UserState = initialState, action: UserAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'ON_UPDATE_LOCATION':
            return {
                ...state,
                location: payload
            }
        case 'ON_UPDATE_CART':
            if (!Array.isArray(state.Cart)) {
                return {
                    ...state,
                    Cart: [payload]
                }
            }

            const existingFoods = state.Cart.filter(item => item.id === payload.id);
            if (existingFoods.length > 0) {
                let updatedCart = state.Cart.map((food) => {
                    if (food.id === payload.id) {
                        food.unit = payload.unit;
                    }
                    return food;
                })

                return {
                    ...state,
                    Cart: updatedCart.filter(item => item.unit > 0)
                }
            }
            else {
                return {
                    ...state,
                    Cart: [...state.Cart, payload]
                }
            }
        case 'ON_USER_LOGIN':
            // console.log('User Login...');
            // console.log(payload);
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }

}
export { UserReducer }