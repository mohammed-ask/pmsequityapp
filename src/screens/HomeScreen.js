import { StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingSpinner from "../Components/Loader";
import { getValue, storeData } from "../utils/storage";
import NavigationConstants from "../navigation/NavigationConstants";
// import CookieManager from '@react-native-cookies/cookies';
import { StackActions } from '@react-navigation/native'
import Header from "../layout/Header";

const HomeScreen = ({ navigation }) => {
    const [load, setLoad] = useState(true)
    const webViewRef = React.useRef(null);
    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 5000)

    }, []);
    const runscript = async () => {
        const data = await getValue('SignInData')
        const script = `
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://pmsequity.online/dashboard';

                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'postData';
                input.value = ${data};

                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
              `;
        console.log(webViewRef.current, 'dd')
        webViewRef.current.injectJavaScript(script);
    }
    // const [pageSubmit, setPageSubmit] = useState(false)
    // // const navigation = useNavigation();
    // useEffect(() => {
    //     if (pageSubmit) {
    //         (async () => {
    //             // const cookies = await CookieManager.get('https://pmsequity.online');
    //             // await storeData('SignInData', JSON.stringify(cookies))
    //             // console.log('Cookies:', cookies);
    //             // if (cookies.Cookies) {
    //             console.log('navigate new screen')
    //             setTimeout(() => {
    //                 console.log('hii')
    //                 // navigation.dispatch(StackActions.replace(NavigationConstants.TAB_SCREEN, {}))
    //             }, 10000);
    //             // }
    //             // You can now access the cookies here and use them as needed.
    //         })();
    //     }
    //     // Add an event listener to wait for page load before fetching cookies.
    //     // const webview = document.querySelector('webview');
    //     // webview.addEventListener('did-finish-load', fetchData);

    //     // return () => {
    //     //     // Remove the event listener when the component unmounts.
    //     //     webview.removeEventListener('did-finish-load', fetchData);
    //     // };
    // }, [pageSubmit]);

    const onNavigationStateChange = path => {
        const url = path.nativeEvent.url;
        // console.log(url, '---', pageSubmit)
        // if (url !== 'https://pmsequity.online/login') {
        //     setPageSubmit(true)
        // }

    };

    // if (pageSubmit) {
    //     return <LoadingSpinner />
    // }

    console.log('this is home')
    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <WebView
                source={{ uri: 'https://pmsequity.online/dashboard' }}
                onLoad={load ? runscript : null}
                ref={webViewRef}
                startInLoadingState={true}
                renderLoading={() => <LoadingSpinner />}
                onLoadProgress={path => {
                    onNavigationStateChange(path);
                }}

            />
        </View>
    );
};

export default HomeScreen;

