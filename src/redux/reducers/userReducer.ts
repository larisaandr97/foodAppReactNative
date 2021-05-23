
import { UserAction } from '../actions'
import { UserModel, UserState } from '../models'
import { LocationGeocodedAddress } from 'expo-location'

const initialState: UserState = {
    user: {} as UserModel,
    location: {} as LocationGeocodedAddress,
    error: undefined,
}

const UserReducer = (state: UserState = initialState, action: UserAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'ON_UPDATE_LOCATION':
            return {
                ...state,
                location: payload
            }
        default:
            return state;
    }

}
export { UserReducer }