import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageSourcePropType } from 'react-native'

interface ButtonProps {
    onTap: Function;
    //  isAdded: boolean,

}


const ButtonAddRemove: React.FC<ButtonProps> = ({ onTap }) => {

    return (
        <TouchableOpacity style={styles.btn}
            onPress={() => onTap()}>
            {/* <Image style={{ width: (width - 2), height: (height - 2) }} source={icon} /> */}
            <Text style={{ fontSize: 18, color: '#FFF' }}>Add</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btn: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 40, alignSelf: 'center', borderRadius: 30, backgroundColor: '#f15b5b' },
})

export { ButtonAddRemove }