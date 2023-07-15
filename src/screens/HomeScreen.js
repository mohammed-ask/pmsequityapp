import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingSpinner from "../Components/Loader";

const LoginScreen = () => {
    const navigation = useNavigation();

    const webViewRef = React.useRef(null);
    const postData = {
        variable1: 'value1',
        variable2: 'value2',
    };

    const postDataString = JSON.stringify(postData);

    const script = `
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://pms-equity.com';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'postData';
  input.value = ${postDataString};

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
`;
    React.useEffect(() => {



        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(script);
        }

    }, []);
    const runscript = () => {
        // console.log('yup')
        console.log(webViewRef.current, 'yoyoyo')
        webViewRef.current.injectJavaScript(script);
    }
    return (
        <View style={{ flex: 1 }}>
            <WebView
                // onLoad={runscript}
                // onLoadEnd={runscript}
                onLoadProgress={runscript}
                // onLayout={runscript}
                ref={webViewRef}
                source={{ uri }}
                startInLoadingState={true}
                renderLoading={() => <LoadingSpinner />}
            />
        </View>
    );
};

export default LoginScreen;

