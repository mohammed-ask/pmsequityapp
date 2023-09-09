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
                form.action = 'https://pmsequity.online/fund';

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

    const handleWebViewError = (error) => {
        // Check if the error message contains "Connection refused" (you can adjust this condition)
        if (error.nativeEvent.description.includes('Connection refused')) {
            // Reload the WebView
            webViewRef.current.reload();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 3000)

    }, []);

    console.log(load, 'lll')

    return (
        <>
            {load ? <LoadingSpinner /> : null}
            <View style={{ flex: 1, marginBottom: 60, display: load ? 'none' : 'flex' }}>
                <Header navigation={navigation} />
                <WebView
                    onLoad={load ? runscript : null}
                    // onLoadEnd={runscript}
                    // onLoadProgress={runscript}
                    // onLayout={runscript}
                    ref={webViewRef}
                    source={{ uri: 'https://pmsequity.online/fund' }}
                    startInLoadingState={true}
                    renderLoading={() => <LoadingSpinner />}
                    onError={handleWebViewError}
                />
            </View>
        </>
    );
};

export default HomeScreen;

