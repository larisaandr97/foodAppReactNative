import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'


import { useNavigation } from '../utils'
import { SearchBar } from '../components'

import { connect } from 'react-redux'
import { onAvailability, UserState, ApplicationState, ShoppingState } from '../redux'



interface FoodDetailsProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function
}

const FoodDetailsScreen: React.FC<FoodDetailsProps> = (props) => {


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>

                <Text>Navigation</Text>
            </View>
            <View style={styles.body}>
                <Text> Search Screen</Text>
            </View>
            <View style={styles.footer}>
                <Text>Footer</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

export { FoodDetailsScreen }