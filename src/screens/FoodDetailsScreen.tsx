import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, FlatList } from 'react-native'


import { useNavigation } from '../utils/useNavigation'
import { ButtonWithIcon, FoodCard } from '../components'

import { connect } from 'react-redux'
import { UserState, ApplicationState, ShoppingState, FoodModel, onUpdateCart } from '../redux'
import { checkExistence } from '../utils'

interface FoodDetailsProps {
    userReducer: UserState,
    navigation: { getParam: Function, goBack: Function },
    onUpdateCart: Function,
}

const _FoodDetailsScreen: React.FC<FoodDetailsProps> = (props) => {

    const { navigate } = useNavigation();

    const { getParam, goBack } = props.navigation;
    const food = getParam('food') as FoodModel;

    const fileReaderInstance = new FileReader();
    var base64data;
    fileReaderInstance.readAsDataURL(food.image);
    fileReaderInstance.onload = () => {
        base64data = fileReaderInstance.result;
        // console.log(base64data);
    }
    let imageUri = "data:image/png;base64," + base64data;

    const { Cart } = props.userReducer;

    return (<View style={styles.container}>
        <View style={styles.navigation}>
            <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
            <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 80 }}> {food.name}</Text>
        </View>
        <View style={styles.body}>
            <ImageBackground source={{ uri: imageUri }}
                style={{ width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end', }}>
                <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10 }}>
                    <Text style={{ color: '#FFF', fontSize: 40, fontWeight: '700' }} > {food.name}</Text>
                    <Text style={{ color: '#FFF', fontSize: 25, fontWeight: '500' }} > {food.category} </Text>
                </View>
            </ImageBackground>

            <View style={{ display: 'flex', height: 300, padding: 20 }}>
                <Text> Food will be ready within {food.readyTime} minute(s)</Text>
                <Text>{food.description} </Text>
            </View>
            <View style={{ height: 120, }}>
                <FoodCard item={checkExistence(food, Cart)} onTap={() => { }} onUpdateCart={props.onUpdateCart} />
            </View>

        </View>
    </View>)
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2' },
    navigation: { flex: 1, marginTop: 43, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' },
    body: { flex: 11, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', paddingBottom: 160 },
    footer: { flex: 1, backgroundColor: 'cyan' }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const FoodDetailsScreen = connect(mapToStateProps, { onUpdateCart })(_FoodDetailsScreen)


export { FoodDetailsScreen }