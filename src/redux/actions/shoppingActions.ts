import axios from 'axios'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import { LocationGeocodedAddress } from 'expo-location'
import { FoodAvailability, FoodModel } from '../models'

//availability action

export interface AvailabilityAction {
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}


export interface FoodSearchAction {
    readonly type: 'ON_FOODS_SEARCH',
    payload: [FoodModel]
}


export interface ShoppingErrorAction {
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}

export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction

//Trigger actions from Components

export const onAvailability = (postCode: string) => {

    // console.log(`Post Code with request ${postCode}`);

    return async (dispatch: Dispatch<ShoppingAction>) => {
        try {

            //   const response = await axios.get<FoodAvailability>(`${BASE_URL}/food/availability/${postCode}`);
            // axios
            //     .get(`{BASE_URL}/products`)
            //     .then((response) => { console.log("Rezultat:" + response.data) }).catch(function (error) {
            //         console.log('There has been a problem with your fetch operation: ' + error.message);
            //         // ADD THIS THROW error
            //         throw error;
            //     });;
            const response = await axios.get<FoodAvailability>(`${BASE_URL}/restaurants/all`);

            // console.log(response.data);

            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                //save our location in local storage
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                })
            }

        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}


export const onSearchFoods = (postCode: string) => {

    // console.log(`Post Code with request ${postCode}`);

    return async (dispatch: Dispatch<ShoppingAction>) => {
        try {

            //   const response = await axios.get<FoodAvailability>(`${BASE_URL}/food/availability/${postCode}`);
            // axios
            //     .get(`{BASE_URL}/products`)
            //     .then((response) => { console.log("Rezultat:" + response.data) }).catch(function (error) {
            //         console.log('There has been a problem with your fetch operation: ' + error.message);
            //         // ADD THIS THROW error
            //         throw error;
            //     });;
            const response = await axios.get<[FoodModel]>(`${BASE_URL}/foods`);

            // console.log(response.data);

            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                //save our location in local storage
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: response.data
                })
            }

        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}



