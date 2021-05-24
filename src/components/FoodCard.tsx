import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { FoodModel } from '../redux'
import { ButtonAddRemove } from './ButtonAddRemove';

interface FoodProps {
    item: FoodModel;
    onTap: Function;

}

const FoodCard: React.FC<FoodProps> = ({ item, onTap }) => {
    // const icon = '../images/' + item.toLowerCase();
    let imageUri = "data:image/png;base64," + item.image;
    return (<View style={styles.container}>

        <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 20, backgroundColor: '#EAEAEA' }} />
        <TouchableOpacity onPress={() => onTap(item)}
            style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ display: 'flex', flex: 7, padding: 10 }}>
                <Text>{item.name}</Text>
                <Text>{item.category}</Text>
            </View>
            <View style={{ display: 'flex', flex: 5, padding: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#7C7C7C' }}>{item.price} RON</Text>
                <ButtonAddRemove onTap={() => { }} />
                {/* <ButtonAddRemove
                    onAdd={() => {
                        let unit = isNaN(item.unit) ? 0 : item.unit;
                        didUpdateCart(unit + 1);
                    }}
                    onRemove={() => {
                        let unit = isNaN(item.unit) ? 0 : item.unit;
                        didUpdateCart(unit > 0 ? unit - 1 : unit);
                    }}
                    qty={item.unit} /> */}
            </View>
        </TouchableOpacity>

    </View>)
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        width: Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        height: 100,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        flexDirection: 'row'



    },
    navigation: { flex: 2, backgroundColor: 'red' },
    body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
    footer: { flex: 1, backgroundColor: 'cyan' }
})

export { FoodCard }