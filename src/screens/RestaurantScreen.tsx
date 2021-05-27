import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, FlatList } from 'react-native'


import { useNavigation } from '../utils/useNavigation'
import { ButtonWithIcon, FoodCard } from '../components'

import { connect } from 'react-redux'
import { ApplicationState, Restaurant, FoodModel, onUpdateCart, UserState, onUpdateLocation } from '../redux'
import { checkExistence } from '../utils'


interface RestaurantProps {
    userReducer: UserState,
    onUpdateCart: Function,
    navigation: { getParam: Function, goBack: Function }
}

const _RestaurantScreen: React.FC<RestaurantProps> = (props) => {

    const { navigate } = useNavigation();

    const { getParam, goBack } = props.navigation;
    const restaurant = getParam('restaurant') as Restaurant;
    //  console.log(restaurant);


    const { Cart } = props.userReducer;

    const fileReaderInstance = new FileReader();
    var base64data;
    fileReaderInstance.readAsDataURL(restaurant.image);
    fileReaderInstance.onload = () => {
        base64data = fileReaderInstance.result;
        // console.log(base64data);
    }
    let imageUri = "data:image/png;base64," + restaurant.image;


    const onTapFood = (item: FoodModel) => {
        navigate("FoodDetailsPage", { food: item });
    }

    return (<View style={styles.container}>
        <View style={styles.navigation}>
            <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
            <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 80 }}> {restaurant.name}</Text>
        </View>
        <View style={styles.body}>
            <ImageBackground source={{ uri: imageUri }}
                style={{ width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end', }}
            >
                <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10 }}>

                    <Text style={{ color: '#FFF', fontSize: 40, fontWeight: '700' }} > {restaurant.name}</Text>
                    <Text style={{ color: '#FFF', fontSize: 25, fontWeight: '500' }} > {restaurant.address} {restaurant.phone}</Text>

                </View>
            </ImageBackground>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={restaurant.foods}
                renderItem={({ item }) => <FoodCard item={checkExistence(item, Cart)} onTap={onTapFood} onUpdateCart={props.onUpdateCart} />}
                keyExtractor={(item) => `${item.id}`}
            />

        </View>
    </View>)
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2' },
    navigation: { flex: 1, marginTop: 43, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' },
    body: { flex: 11, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', },
    footer: { flex: 1, backgroundColor: 'cyan' }
})



const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const RestaurantScreen = connect(mapToStateProps, { onUpdateCart })(_RestaurantScreen)


export { RestaurantScreen }