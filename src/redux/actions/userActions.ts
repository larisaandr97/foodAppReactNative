import axios from 'axios'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import { LocationGeocodedAddress } from 'expo-location'
//import AsyncStorage from '@react-native-community/async-storage'
import { AsyncStorage } from 'react-native';
import { FoodModel, UserModel } from '../models'


export interface UpdateLocationAction {
    readonly type: 'ON_UPDATE_LOCATION',
    payload: LocationGeocodedAddress
}

export interface UserErrorAction {
    readonly type: 'ON_USER_ERROR',
    payload: any
}


export interface UpdateCartAction {
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}

export interface UserLoginAction {
    readonly type: 'ON_USER_LOGIN',
    payload: UserModel
}




export type UserAction = UpdateLocationAction | UserErrorAction | UpdateCartAction | UserLoginAction;

// User Actions trigger from Components

export const onUpdateLocation = (location: LocationGeocodedAddress) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            const locationString = JSON.stringify(location);
            await AsyncStorage.setItem('user_location', locationString);
            //save our location in local storage
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUpdateCart = (item: FoodModel) => {

    return async (dispatch: Dispatch<UserAction>) => {

        dispatch({
            type: 'ON_UPDATE_CART',
            payload: item
        });

    }
}

export const onUserLogin = (email: string, password: string) => {

    return async (dispatch: Dispatch<UserAction>) => {


        const response = await axios.post<UserModel>(`${BASE_URL}/user/login`,
            {
                email,
                password
            });

        // console.log(response.data);
        try {
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                })
            } else {
                //save our location in local storage
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })

        }
    }
}

export const onUserSignup = (email: string, phone: string, password: string) => {

    return async (dispatch: Dispatch<UserAction>) => {


        const response = await axios.post<UserModel>(`${BASE_URL}/user/signup`,
            {
                email,
                phone,
                password
            });

        // console.log(response.data);
        try {
            if (!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Login error'
                })
            } else {
                //save our location in local storage
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })

        }
    }
}