import { FoodModel } from '../redux'

const checkExistence = (item: FoodModel, Cart: [FoodModel]) => {

    if (Array.isArray(Cart)) {
        let currentItem = Cart.filter((cartItem) => cartItem.id === item.id);
        if (currentItem.length > 0) {
            return currentItem[0];
        }
    }
    return item;
}

export { checkExistence }