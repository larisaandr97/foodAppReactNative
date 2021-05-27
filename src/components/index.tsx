export * from './SearchBar'
export * from './ButtonWithIcon'
export * from './CategoryCard'
export * from './RestaurantCard'
export * from './FoodCard'
export * from './ButtonAddRemove'
export * from './FoodCartInfo'
export * from "./ButtonWithTitle"
export * from './TextField'

const images = {
    burgers: {
        imgName: 'Burgers',
        uri: require('../images/burger.jpg')
    },
    pizza: {
        imgName: 'Pizza',
        uri: require('../images/pizza.jpg')
    },
    pasta: {
        imgName: 'Pasta',
        uri: require('../images/pasta.jpg')
    },
    coffee: {
        imgName: 'Coffee',
        uri: require('../images/coffee.jpeg')
    },
}

export { images };