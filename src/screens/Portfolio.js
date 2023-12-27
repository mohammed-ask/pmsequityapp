import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import LoadingSpinner from "../Components/Loader";
import { getValue } from "../utils/storage";
import Header from "../layout/Header";
import { baseURL } from "../utils/helpers";

let pageSubmit = 2;
const HomeScreen = ({ navigation, route }) => {
    const query = route?.params?.query
    console.log(query, 'qq')
    const [load, setLoad] = useState(true)
    const webViewRef = React.useRef(null);

    const runscript = async (data) => {
        const { nativeEvent } = data;
        if (pageSubmit % 2 === 0) {
            console.log('firsttime')
            const queryString = nativeEvent.url.split('#')[1];

            const data = await getValue('SignInData')
            // const data = JSON.stringify(postData);
            const script = `
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '${baseURL}portfolio#${queryString}';

                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'postData';
                input.value = ${data};

                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
              `;
            webViewRef.current.injectJavaScript(script);
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

    const handleWebViewError = (error) => {
        // Check if the error message contains "Connection refused" (you can adjust this condition)
        if (error.nativeEvent.description.includes('Connection refused')) {
            // Reload the WebView
            webViewRef.current.reload();
        }
    };


    return (
        <View style={{ flex: 1, marginBottom: 60 }}>
            {load ? <LoadingSpinner /> : null}
            <Header navigation={navigation} />
            <WebView
                // onLoad={runscript}
                // onLoadEnd={runscript}
                // onLoadProgress={runscript}
                // onLayout={runscript}
                ref={webViewRef}
                source={{ uri: `${baseURL}portfolio${query}` }}
                startInLoadingState={true}
                renderLoading={() => <LoadingSpinner />}
                onError={handleWebViewError}
            />
        </View>
    );
};

export default HomeScreen;

