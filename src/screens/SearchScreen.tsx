import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'


import { useNavigation } from '../utils'
import { SearchBar, ButtonWithIcon, FoodCard } from '../components'

import { connect } from 'react-redux'
import { onAvailability, UserState, ApplicationState, ShoppingState, FoodModel } from '../redux'



interface SearchProps {
    // userReducer: UserState,
    shoppingReducer: ShoppingState,
}

const _SearchScreen: React.FC<SearchProps> = (props) => {

    const { navigate } = useNavigation();

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState('')

    const { availableFoods } = props.shoppingReducer;

    // console.log(availableFoods);

    const onTapFood = (item: FoodModel) => {
        console.log("Tapped: " + item.name);
        navigate('FoodDetailsPage', { food: item })
    }


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                    <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigate("HomePage")} width={40} height={50} />
                    <SearchBar onTextChange={setKeyword} onEndEditing={() => setIsEditing(false)} didTouch={() => setIsEditing(true)} />
                </View>
            </View>
            <View style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={
                        isEditing
                            ?
                            availableFoods.filter((item) => {
                                return item.name.includes(keyword)
                            })
                            : availableFoods
                    }
                    renderItem={({ item }) => <FoodCard onTap={onTapFood} item={item} />}
                    keyExtractor={(item) => `${item.id}`}
                />

            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2' },
    navigation: { flex: 1, marginTop: 43, },
    body: { flex: 10, justifyContent: 'center', alignItems: 'center' },
    footer: { flex: 1, backgroundColor: 'cyan' }
})


const mapToStateProps = (state: ApplicationState) => ({
    // userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const SearchScreen = connect(mapToStateProps, { onAvailability })(_SearchScreen)

export { SearchScreen }