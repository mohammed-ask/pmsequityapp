import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { moderateScale } from '../constants/scale';
import SplashScreen from '../screens/Splashscreen';
import LoginScreen from '../screens/Login';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="TabScreen" component={TabScreen} />
        </Stack.Navigator>
    );
};

export const TabScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                unmountOnBlur: true,
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? require('../assets/acthome.png')
                            : require('../assets/home.png');
                    } else if (route.name === 'LibraryScreen') {
                        iconName = focused
                            ? require('../assets/actexplore.png')
                            : require('../assets/explore.png');
                    }
                    return <Image source={iconName} style={style.imgstyle} />;
                },

                tabBarActiveTintColor: Colors.primaryColor,

                tabBarStyle: style.tabstyle,
                tabBarLabelStyle: style.tablabel,
            })}
            backBehavior={'history'}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarItemStyle: {
                        borderRightWidth: 0.5,
                        borderRightColor: '#E0E0E0',
                        alignSelf: 'center',
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const style = StyleSheet.create({
    imgstyle: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    tabstyle: {
        height: 82,
        backgroundColor: '#F4FAFF',
        width: '90%',
        marginBottom: 15,
        position: 'absolute',
        marginLeft: '5%',
        borderRadius: 16,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        paddingTop: 14,
        paddingBottom: 14,
    },
    tablabel: {
        fontSize: 12,
        paddingBottom: 8,
        fontWeight: '500',
    },
});
