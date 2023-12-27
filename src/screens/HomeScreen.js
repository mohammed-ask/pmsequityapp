import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { WebView } from "react-native-webview";
import LoadingSpinner from "../Components/Loader";
import { getValue, storeData } from "../utils/storage";
import Header from "../layout/Header";
import NetInfo from "@react-native-community/netinfo";
import NetinfoAlert from "../Components/NetInfo";
import { baseURL } from "../utils/helpers";

let pageSubmit = 2;
const HomeScreen = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false)
    const [load, setLoad] = useState(true)
    const webViewRef = React.useRef(null);

    const runscript = async (data) => {
        const { nativeEvent } = data;
        if (nativeEvent.url.includes('https://pmsequity.online/portfolio')) {
            navigation.navigate('Portfolio', { query: '#aistock' })
            return
        }
        if (pageSubmit % 2 === 0) {
            console.log('firsttime')
            const data = await getValue('SignInData')
            // const data = JSON.stringify(postData);
            const script = `
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '${baseURL}dashboard';

                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'postData';
                input.value = ${data};

                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
              `;
            webViewRef.current.injectJavaScript(script);
            if (pageSubmit > 3) {
                setLoad(true)
            }
            setTimeout(() => {
                setLoad(false)
            }, 1000)
            pageSubmit = pageSubmit + 1
        } else {
            console.log('secondtime')
            pageSubmit = pageSubmit + 1

            // setLoad(true)
            // setTimeout(() => {
            // }, 2000)
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        webViewRef.current.reload();
        setLoad(true)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    // console.log(load, 'dd')
    return (
        <View style={{ flex: 1 }}>
            {/* <ScrollView style={{ maxHeight: 60, backgroundColor: 'pink' }} scrollEnabled={false}>
                <Header navigation={navigation} />
            </ScrollView> */}
            {/* {load ? <LoadingSpinner /> : null} */}
            <WebView
                source={{ uri: `${baseURL}dashboard` }}
                // onLoad={runscript}
                ref={webViewRef}
                startInLoadingState={true}
            // renderLoading={() => <LoadingSpinner />}
            />
        </View >
    );
};

export default HomeScreen;

