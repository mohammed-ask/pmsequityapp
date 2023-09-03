import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Colors from '../constants/Colors'
import AppText from './AppText'
import { moderateScale } from '../constants/scale'

const AButton = ({ style, buttonTextStyle, title, onPress }) => {
    return (
        <View>
            <TouchableOpacity
                style={[styles.buttonStyle, style]}
                onPress={onPress}
            >
                <AppText style={[styles.buttonTextStyle, buttonTextStyle]}>
                    {title}
                </AppText>
            </TouchableOpacity>
        </View>
    )
}

export default AButton

const styles = StyleSheet.create({
    buttonStyle: {
        width: moderateScale(130),
        height: moderateScale(27),
        backgroundColor: Colors.darkPrimaryColor,
        borderRadius: moderateScale(8),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: Colors.whiteColor,
        fontSize: moderateScale(16),
        fontWeight: 'bold'
    }
})
