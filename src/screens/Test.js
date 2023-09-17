import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Test = ({ navigation }) => {

    useEffect(() => {
        navigation.navigate('Market')
    }, [])

    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Hello, React Native!</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Test;