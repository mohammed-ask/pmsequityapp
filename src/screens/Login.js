import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingSpinner from "../Components/Loader";

const LoginScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://pms-equity.com/login' }}
                startInLoadingState={true}
                renderLoading={() => <LoadingSpinner />}
            />
        </View>
    );
};

export default LoginScreen;

