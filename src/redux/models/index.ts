import { LocationGeocodedAddress } from 'expo-location'

// category
// export interface Category {
//     id: string,
//     title: String,
//     icon: String
// }

// export interface ProductModel {
//     id: number,
//     name: String,
//     description: String,
//     price: number,
//     stock: number,
//     category: String
// }


// Food Model
export interface FoodModel {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    readyTime: number;
    image: Blob;
    // images: [string];
    //unit: number;
}

//Restaurant Model
export interface Restaurant {
    id: string;
    name: string;
    foodType: string;
    address: string;
    phone: string;
    image: Blob;
    // images: string;
    foods: [FoodModel];
}

export interface FoodAvailability {
    categories: [String];
    restaurants: [Restaurant];
    foods: [FoodModel];
    // products: [ProductModel]

}

//todo : Modify later
//User Model
export interface UserModel {
    firstName: string;
    lastName: String;
    contactNumber: String;
    token: string,
    // verified: boolean
}

export interface UserState {
    user: UserModel;
    location: LocationGeocodedAddress;
    error: string | undefined;
    // Cart: [FoodModel];
    //orders
}

export interface ShoppingState {
    availability: FoodAvailability,
    //   availableFoods: [FoodModel]
    //other models
}