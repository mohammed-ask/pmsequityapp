import { Dimensions } from 'react-native'
// import analytics from '@react-native-firebase/analytics'
export const baseURL = 'https://pmsequity.online/'

export const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)

export const FontStyle = {
    // fontBlack: 'SFUIText-Black',
    fontBold: 'SFUIText-Bold',
    fontBoldItalic: 'SFUIText-BoldItalic',
    // fontItalic: 'SFUIText-Italic',
    fontLight: 'SFUIText-Light',
    fontMedium: 'SFUIText-Medium',
    fontMediumItalic: 'SFUIText-MediumItalic',
    fontRegular: 'SFUIText-Regular',
    // fontUltra: 'NeoUltra',
    // fontBlackItalic: 'SFUIText-BlackItalic',
    semiBold: 'SFUIText-SemiBold',
    heavy: 'SFUIText-Heavy',
    heavyItalic: 'SFUIText-HeavyItalic'
}
export const windowHeight = Dimensions.get('window').height
export const windowWidth = Dimensions.get('window').width

export const versionNumber = 1.0
export const versionCode = 1
