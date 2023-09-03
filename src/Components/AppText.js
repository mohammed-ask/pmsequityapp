import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Colors from '../constants/Colors'
// import { FontStyle } from '../utils/helpers'

const AppText = (props) => {
    return (
        <Text
            style={[styles.baseStyle, props.style]}
            onPress={props.onPress}
            numberOfLines={props.numberOfLines}
            {...props}
        >
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    baseStyle: {
        color: Colors.blackColor,
        // fontFamily: FontStyle.fontRegular
    }
})

export default AppText
