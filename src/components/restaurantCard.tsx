import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { Restaurant } from '../redux'

interface RestaurantProps {
    item: Restaurant;
    onTap: Function;

}

const RestaurantCard: React.FC<RestaurantProps> = ({ item, onTap }) => {
    // const icon = '../images/' + item.toLowerCase();
    let imageUri = "data:image/png;base64," + item.image;
    const fileReaderInstance = new FileReader();
    var base64data;

    fileReaderInstance.onloadend = () => {
        base64data = fileReaderInstance.result;
        // console.log(base64data);
    }

    if (item.image) {
        fileReaderInstance.readAsDataURL(item.image);
    }

    return (

        <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
            <Image source={{ uri: `data:image/jpg;base64,${base64data}` }} style={styles.imageIcon} />
            <Text style={{ fontSize: 14, marginTop: 10, color: '#858585' }} >{item.name}</Text>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: { width: 120, height: 140, justifyContent: 'space-around', alignItems: 'center', margin: 5 },
    imageIcon: { width: 120, height: 120, borderRadius: 20, backgroundColor: '#EAEAEA' }

})

export { RestaurantCard }