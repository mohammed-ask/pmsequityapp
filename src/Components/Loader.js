import { ActivityIndicator } from "react-native";
import React from "react";

const LoadingSpinner = () => {
    return (
        <ActivityIndicator
            size="large"
            color={'#057c7c'}
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'white',
                zIndex: 10,
            }}
        />
    );
};

export default LoadingSpinner;
