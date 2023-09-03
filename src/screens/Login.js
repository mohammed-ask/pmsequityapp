import { StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingSpinner from "../Components/Loader";
import { storeData } from "../utils/storage";
import NavigationConstants from "../navigation/NavigationConstants";
import CookieManager from 'react-native-cookies';
import { StackActions } from '@react-navigation/native'

const LoginScreen = ({ navigation }) => {
    const [pageSubmit, setPageSubmit] = useState(false)
    // const navigation = useNavigation();
    useEffect(() => {
        if (pageSubmit) {
            (async () => {
                const cookies = await CookieManager.get('https://pmsequity.online');
                await storeData('SignInData', JSON.stringify(cookies))
                console.log('Cookies:', cookies);
                // if (cookies.Cookies) {
                console.log('navigate new screen')
                navigation.dispatch(StackActions.replace(NavigationConstants.TAB_SCREEN, {}))
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
        if (url !== 'https://pmsequity.online/login') {
            setPageSubmit(true)
        }
        console.log('page change')
        // console.log(path)
        const arr = url.split('/');
        // if (arr[5] !== undefined && arr[5].length == 8) {
        //     setIts(arr[5]);
        //     setCookies(arr[4]);
        // }
        // setTimeout(() => {
        //     if (url == 'https://hr.nazafat.com/dashboard') {
        //         dispatch(checkSession(navigation));
        //     } else if (url == 'https://hr.nazafat.com/profile') {
        //         dispatch(checkSession(navigation));
        //     }
        // }, 700);
    };

    const onMessage = async event => {
        const { data } = event.nativeEvent;
        const cook = data.split(';'); // `csrftoken=...; rur=...; mid=...; somethingelse=...`
        console.log(cook, 'coook')
        await storeData('SignInData', JSON.stringify(cook))
        navigation.navigate(NavigationConstants.HOME_SCREEN)
        cook.forEach(cookie => {
            const c = cookie.trim().split('=');
            const new_cookies = cook;
            new_cookies[c[0]] = c[1];
            if (c[0] == 'token') {
            }
        });
        // if (Platform.OS == 'ios') {
        //     if (data.includes('Cookie:')) {
        //         const storedCookies = await CookieManager.get(
        //             'https://hr.nazafat.com/',
        //             true,
        //         );
        //     }
        // }
    };
    if (pageSubmit) {
        return <LoadingSpinner />
    }
    // useEffect(() => {
    //     setPageSubmit(false)
    // }, [])
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://pmsequity.online/login' }}
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

export default LoginScreen;

