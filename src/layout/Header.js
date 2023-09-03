import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../constants/Colors';
import { removeData } from '../utils/storage';
import { StackActions } from '@react-navigation/native'
import NavigationConstants from '../navigation/NavigationConstants';
import CookieManager from 'react-native-cookies';

const Header = ({ navigation }) => {
    const clearCookies = async () => {
        try {
            await CookieManager.clearAll();
            console.log('Cookies cleared successfully');
        } catch (error) {
            console.error('Error clearing cookies:', error);
        }
    };
    const handlelogout = () => {
        Alert.alert(
            'Are you sure you want to Logout?',
            '',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => { removeData('SignInData'); clearCookies(); navigation.dispatch(StackActions.replace(NavigationConstants.WELCOME_SCREEN, {})) } },
            ],
            { cancelable: false },
        );
    };
    return (
        <View style={styles.container}>
            <Image source={require('../assets/pmslogo.png')} style={styles.logo} />
            <View style={{ alignSelf: 'center', justifyContent: 'flex-end', width: '50%', flexDirection: 'row', paddingRight: 20 }}>
                <MIcon style={styles.message} onPress={() => navigation.navigate(NavigationConstants.EMAIL)} name='message-badge' size={20} color={Colors.grayColor} />
                <FIcon style={{ textAlign: 'right' }} onPress={() => handlelogout()} name='sign-out' size={20} color='maroon' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        justifyContent: 'space-between'
    },
    logo: {
        width: 120,
        height: 70,
        resizeMode: 'contain',
        marginHorizontal: 20
    },
    message: {
        textAlign: 'right',
        marginRight: 20
    }
});

export default Header;