import { View, StatusBar, StyleSheet, Image, Text } from 'react-native'
import React, { useEffect } from 'react'
import splash from '../assets/splash.png'
import { replaceNavigation } from '../navigation/NavigationHandle'
import NavigationConstants from '../navigation/NavigationConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../constants/Colors'

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        const fetchData = async () => {
            let userLoginData = await AsyncStorage.getItem('SignInData')
            console.log(userLoginData, 'uud')
            userLoginData = userLoginData != null ? JSON.parse(userLoginData) : false

            if (userLoginData && userLoginData.userData) {
                // authenticateUser(userLoginData.email)
                navigateScreen(NavigationConstants.TAB_SCREEN)
            } else {
                navigateScreen(NavigationConstants.WELCOME_SCREEN)
            }
        }
        fetchData()
    }, [])

    const navigateScreen = (screenName) => {
        setTimeout(() => {
            replaceNavigation(navigation, screenName)
        }, 2000)
    }

    return (
        <>
            <StatusBar hidden={true} />
            <View style={styles.container}>
                <Image source={splash} style={styles.imageStyle} />
            </View>
        </>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
    imageStyle: {
        width: '55%',
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    textStyle: {
        position: 'absolute',
        width: 118,
        height: 96,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    logo: {
        position: 'absolute',
        bottom: 0,
        resizeMode: 'contain'
    }
})
