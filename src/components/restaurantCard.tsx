import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'

interface RestaurantProps {
    item: Restaurant;
    onTap: Function;

}

const RestaurantCard: React.FC<RestaurantProps> = ({ item, onTap }) => {
    // const icon = '../images/' + item.toLowerCase();
    return (

        <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
            <Image source={imageName} style={styles.imageIcon} />
            <Text style={{ fontSize: 14, marginTop: 10, color: '#858585' }} >{item}</Text>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: { width: 120, height: 140, justifyContent: 'space-around', alignItems: 'center', margin: 5 },
    imageIcon: { width: 120, height: 120, borderRadius: 20, backgroundColor: '#EAEAEA' }

})

export { RestaurantCard }