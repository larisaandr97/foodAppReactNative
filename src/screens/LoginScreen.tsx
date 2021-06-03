import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { ButtonWithTitle, TextField } from '../components';
import { connect } from 'react-redux';
import { ApplicationState, onUserLogin, onUserSignup, UserState } from '../redux';

interface LoginProps {
    OnUserLogin: Function,
    OnUserSignup: Function,
    userReducer: UserState
}

const _LoginScreen: React.FC<LoginProps> = ({ OnUserLogin, OnUserSignup, userReducer }) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('Login')
    const [isSignup, setIsSignup] = useState(false)

    const [otp, setOtp] = useState('');
    const [verified, setVerified] = useState(true);
    const [requestOtpTitle, setRequestOtpTitle] = useState('Request a new OTP in ');
    const [canRequestOtp, setCanRequestOtp] = useState(true);

    const onTapOptions = () => {
        setIsSignup(!isSignup);
        setTitle(!isSignup ? 'Signup' : 'Login');

    }

    const onTapAuthenticate = () => {
        if (isSignup) {
            onUserSignup(email, phone, password);
        }
        else {
            onUserLogin(email, password);
        }
    }


    if (!verified) {
        //show OTP page
        return (<View style={styles.container}>
            <View style={styles.navigation}><Text style={{ fontSize: 30, fontWeight: '400' }}>{title}</Text></View>
            <View style={styles.body}>
                <Image source={require('../images/verify_otp.png')}
                    style={{ width: 120, height: 120, margin: 20 }} />
                <Text style={{ fontSize: 22, fontWeight: '500', margin: 10 }}> Verification </Text>
                <Text></Text>

            </View>
            <View style={styles.footer}></View>
        </View>)
    }

    else {
        return (<View style={styles.container}>
            <View style={styles.navigation}><Text style={{ fontSize: 30, fontWeight: '400' }}>{title}</Text></View>
            <View style={styles.body}>

                <TextField placeholder="Email ID" onTextChange={setEmail} isSecure={false} />

                {isSignup && <TextField placeholder="Phone Number" onTextChange={setPhone} isSecure={false} />}
                <TextField placeholder="Password" onTextChange={setPassword} isSecure={true} />

                <ButtonWithTitle title={title} height={50} width={350} onTap={onTapAuthenticate} />

                <ButtonWithTitle
                    title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"}
                    height={50}
                    width={350}
                    isNoBg={true}
                    onTap={onTapOptions}
                />

            </View>
            <View style={styles.footer}></View>
        </View>)
    }

}

const styles = StyleSheet.create({
    container: { flex: 1, },
    navigation: { flex: 3, justifyContent: 'center', paddingLeft: 30 },
    body: { flex: 6, justifyContent: 'center', alignItems: 'center' },
    footer: { flex: 3, }
})


const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})


const LoginScreen = connect(mapStateToProps, { onUserLogin, onUserSignup })(_LoginScreen)

export { LoginScreen }