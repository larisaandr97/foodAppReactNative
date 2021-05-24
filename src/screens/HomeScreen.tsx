import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { useNavigation } from '../utils'
import { ButtonWithIcon, SearchBar, CategoryCard, RestaurantCard, FoodCard } from '../components'

import { connect } from 'react-redux'
import { onAvailability, UserState, ApplicationState, ShoppingState, Restaurant, FoodModel } from '../redux'

// import { images } from '../components/index'

interface HomeProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function
}

export const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { navigate } = useNavigation();

    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;

    const { categories, foods, restaurants } = availability;

    console.log("RESTAURANTS:");
    // console.log(restaurants);

    useEffect(() => {
        props.onAvailability(location.postalCode)
    }, [])


    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item })
    }

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    }


    const images = [
        {
            id: 11,
            imgName: 'Burgers',
            uri: require('../images/burger.jpg')
        },
        {
            id: 22,
            imgName: 'Pizza',
            uri: require('../images/pizza.jpg')
        },
        {
            id: 32,
            imgName: 'Pasta',
            uri: require('../images/pasta.jpg')
        },
        {
            id: 42,
            imgName: 'Coffee',
            uri: require('../images/coffee.jpeg')
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>

                <View style={styles.addressText}>
                    <Text>{`${location.street}, ${location.postalCode}, ${location.city}`}</Text>
                    <Text> Edit button </Text>
                </View>
                <View style={styles.searchBarView}>
                    <SearchBar didTouch={() => {
                        navigate('SearchPage')
                    }}
                        onTextChange={() => { }} />
                    <ButtonWithIcon onTap={() => { }} icon={require('../images/hambar.png')} width={50} height={40} />
                </View>

            </View>
            <View style={styles.body}>
                <ScrollView>
                    <FlatList horizontal
                        showsHorizontalScrollIndicator={false}
                        data={images}
                        renderItem={({ item }) => <CategoryCard item={item.imgName} imageName={item.uri} onTap={() => { alert('Category tapped') }} />}
                        keyExtractor={(item) => `${item.id}`}
                    />
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20 }}> Top Restaurants </Text>
                    </View>
                    <FlatList horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem={({ item }) => <RestaurantCard item={item} onTap={onTapRestaurant} />}
                        keyExtractor={(item) => `${item.id}`}
                    />
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20 }} > 30 Minutes Foods</Text>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={foods}
                        renderItem={({ item }) => <RestaurantCard item={item} onTap={onTapFood} />}
                        keyExtractor={(item) => `${item.id}`}
                    />
                </ScrollView>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    navigation: {
        flex: 2,
    },
    addressText: {
        marginTop: 0,
        flex: 4,
        backgroundColor: 'white',
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    searchBarView: {
        display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },

})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability })(_HomeScreen)

export { HomeScreen }