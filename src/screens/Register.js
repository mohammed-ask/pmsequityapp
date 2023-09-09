import { StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingSpinner from "../Components/Loader";
import { storeData } from "../utils/storage";
import NavigationConstants from "../navigation/NavigationConstants";
import CookieManager from 'react-native-cookies';
import { StackActions } from '@react-navigation/native'

const Register = ({ navigation }) => {
    const [pageSubmit, setPageSubmit] = useState(false)
    // const navigation = useNavigation();
    useEffect(() => {
        if (pageSubmit) {
            (async () => {
                // const cookies = await CookieManager.get('https://pmsequity.online');
                // await storeData('SignInData', JSON.stringify(cookies))
                // console.log('Cookies:', cookies);
                // if (cookies.Cookies) {
                console.log('navigate to Login')
                navigation.dispatch(StackActions.replace(NavigationConstants.LOGIN, {}))
                // }
                // You can now access the cookies here and use them as needed.
            })();
        }
        // Add an event listener to wait for page load before fetching cookies.
        // const webview = document.querySelector('webview');
        // webview.addEventListener('did-finish-load', fetchData);

        // return () => {
        //     // Remove the event listener when the component unmounts.
        //     webview.removeEventListener('did-finish-load', fetchData);
        // };
    }, [pageSubmit]);

    const onNavigationStateChange = path => {
        const url = path.nativeEvent.url;
        console.log(url, '---', pageSubmit)
        if (url === 'https://pmsequity.online/login') {
            setPageSubmit(true)
        }
        console.log('page change')

    };


    if (pageSubmit) {
        return <LoadingSpinner />
    }

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://pmsequity.online/register' }}
                startInLoadingState={true}
                renderLoading={() => <LoadingSpinner />}
                // sharedCookiesEnabled={true}
                // onMessage={onMessage}
                onLoadProgress={path => {
                    onNavigationStateChange(path);
                }}

            />
        </View>
    );
};

export default Register;

