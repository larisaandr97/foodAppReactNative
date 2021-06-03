import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'


import { checkExistence, useNavigation } from '../utils'
import { FoodCartInfo, ButtonWithTitle } from '../components'

import { connect } from 'react-redux'
import { UserState, ApplicationState, ShoppingState, FoodModel, onUpdateCart } from '../redux'


interface CartScreenProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onUpdateCart: Function
}

const _CartScreen: React.FC<CartScreenProps> = (props) => {

    const { navigate } = useNavigation();

    const [totalAmount, setTotalAmount] = useState(0);

    const { Cart, user } = props.userReducer;

    console.log(Cart);

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailsPage', { food: item })
    }

    useEffect(() => {
        onCalculateAmount();
    }, [Cart]); //take effect when Cart object is changed

    const onCalculateAmount = () => {

        let total = 0;
        if (Array.isArray(Cart)) {
            Cart.map(food => {
                total += food.price * food.unit;
            })
        }
        setTotalAmount(total);

    }

    const onValidateOrder = () => {
        navigate('LoginPage');
        // if(user.verified)
    }


    if (Cart.length > 0) {

        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={Cart
                        }
                        renderItem={({ item }) => <FoodCartInfo

                            item={checkExistence(item, Cart)}
                            onUpdateCart={props.onUpdateCart} />}
                        keyExtractor={(item) => `${item.id}`}
                    />
                </View>
                <View style={styles.footer}>
                    <View style={styles.amountView}>
                        <Text style={{ fontSize: 18 }}> Total: </Text>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}> {totalAmount} </Text>
                    </View>
                    <ButtonWithTitle title={"Order Now"} onTap={onValidateOrder} height={50} width={320} />
                </View>

            </View>
        )
    }
    else {
        return (<View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700' }}>Your Cart is empty! </Text>
        </View>)
    }


}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2' },
    navigation: { flex: 1, marginTop: 43, },
    body: { flex: 8, justifyContent: 'center', alignItems: 'center' },
    footer: { flex: 3, padding: 10 },
    amountView: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 },
})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const CartScreen = connect(mapToStateProps, { onUpdateCart })(_CartScreen)

export { CartScreen }