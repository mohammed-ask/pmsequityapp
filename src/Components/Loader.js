import { ActivityIndicator, View } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";

const LoadingSpinner = () => {
    return (
        <View style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'white',
            zIndex: 10,
        }}>
            <FastImage
                source={require('../assets/loader.gif')}
                style={{
                    width: 50,
                    height: 50,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    );
};

export default LoadingSpinner;
