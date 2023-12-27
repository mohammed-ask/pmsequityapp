import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import LoadingSpinner from "../Components/Loader";
import { getValue } from "../utils/storage";
import Header from "../layout/Header";
import { baseURL } from "../utils/helpers";

let pageSubmit = 2;
const ProfileScreen = ({ navigation }) => {
    const [load, setLoad] = useState(true)
    const webViewRef = React.useRef(null);

    const runscript = async (data) => {
        console.log(pageSubmit % 2)
        if (pageSubmit % 2 === 0) {
            console.log('firsttime')
            const data = await getValue('SignInData')
            // const data = JSON.stringify(postData);
            const script = `
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '${baseURL}profile';

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
                ref={webViewRef}
                source={{ uri: `${baseURL}profile` }}
                startInLoadingState={true}
                renderLoading={() => <LoadingSpinner />}
                onError={handleWebViewError}
            />
        </View>
    );
};

export default ProfileScreen;

