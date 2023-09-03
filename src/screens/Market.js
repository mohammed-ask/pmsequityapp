import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import LoadingSpinner from "../Components/Loader";
import { getValue } from "../utils/storage";
import Header from "../layout/Header";
const HomeScreen = ({ navigation }) => {
    const [load, setLoad] = useState(true)
    const webViewRef = React.useRef(null);

    const runscript = async () => {
        const data = await getValue('SignInData')
        // const data = JSON.stringify(postData);
        const script = `
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://pmsequity.online/market';

                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'postData';
                input.value = ${data};

                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
              `;
        webViewRef.current.injectJavaScript(script);
    }

    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 3000)

    }, []);

    console.log(load, 'lll')

    return (
        <>
            {load ? <LoadingSpinner /> : null}
            <View style={{ flex: 1, marginBottom: 70, display: load ? 'none' : 'flex' }}>
                <Header navigation={navigation} />
                <WebView
                    onLoad={load ? runscript : null}
                    ref={webViewRef}
                    source={{ uri: 'https://pmsequity.online/market' }}
                    startInLoadingState={true}
                    renderLoading={() => <LoadingSpinner />}
                />
            </View>
        </>
    );
};

export default HomeScreen;

