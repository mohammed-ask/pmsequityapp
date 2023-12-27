import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import {moderateScale} from '../constants/scale';
import SplashScreen from '../screens/Splashscreen';
import LoginScreen from '../screens/Login';
import {Image, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Portfolio from '../screens/Portfolio';
import Market from '../screens/Market';
import Email from '../screens/Email';
import Fund from '../screens/Fund';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Test from '../screens/Test';
import ForgetMpin from '../screens/ForgetMpin';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="ForgetMpin" component={ForgetMpin} />
      <Stack.Screen
        options={{unmountOnBlur: true}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="TabScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export const TabScreen = () => {
  return (
    <Tab.Navigator
      tabBarStyle={{display: 'none', backgroundColor: 'green'}}
      screenOptions={({route}) => ({
        headerShown: false,
        unmountOnBlur: false,
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'view-dashboard';
            color = focused ? Colors.primaryColor : Colors.grayColor;
          } else if (route.name === 'Market') {
            iconName = 'chart-bell-curve';
            color = focused ? Colors.whiteColor : Colors.whiteColor;
          } else if (route.name === 'Portfolio') {
            iconName = 'folder-table';
            color = focused ? Colors.primaryColor : Colors.grayColor;
          } else if (route.name === 'Fund') {
            iconName = 'wallet';
            color = focused ? Colors.primaryColor : Colors.grayColor;
          } else if (route.name === 'Profile') {
            iconName = 'account-cog';
            color = focused ? Colors.primaryColor : Colors.grayColor;
          }
          return <Icon name={iconName} color={color} size={22} />;
        },

        tabBarActiveTintColor: Colors.primaryColor,

        tabBarStyle: style.tabstyle,
        tabBarLabelStyle: style.tablabel,
      })}
      backBehavior={'history'}>
      <Tab.Screen
        tabBarStyle={{display: 'none'}}
        name="Home"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Home',
          tabBarItemStyle: {
            // borderRightWidth: 0.5,
            // borderRightColor: '#E0E0E0',
            alignSelf: 'center',
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({query: null}),
        })}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Portfolio',
          tabBarItemStyle: {
            // borderRightWidth: 0.5,
            // borderRightColor: '#E0E0E0',
            alignSelf: 'center',
          },
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          unmountOnBlur: true,
          tabBarLabel: '',
          tabBarItemStyle: {
            maxWidth: 45,
            backgroundColor: Colors.primaryColor,
            height: 45,
            borderRadius: 40,
            marginBottom: 15,
            marginTop: 10,
            paddingTop: 8,
            marginHorizontal: 15,
            alignSelf: 'center',
          },
        }}
      />
      <Tab.Screen
        name="Email"
        component={Email}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Fund"
        component={Fund}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Wallet',
          tabBarItemStyle: {
            // borderRightWidth: 0.5,
            // borderRightColor: '#E0E0E0',
            alignSelf: 'center',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Setting',
          tabBarItemStyle: {
            // borderRightWidth: 0.5,
            // borderRightColor: '#E0E0E0',
            alignSelf: 'center',
            // justifyContent: 'flex-end',
            // backgroundColor: 'green'
          },
        }}
      />
      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          unmountOnBlur: true,
          tabBarButton: () => null,
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
    height: 60,
    backgroundColor: Colors.whiteColor,
    // width: '90%',
    // marginBottom: 15,
    position: 'absolute',
    // marginLeft: '5%',
    // borderRadius: 16,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingTop: 15,
    paddingBottom: 8,
  },
  tablabel: {
    fontSize: 10,
    paddingBottom: 0,
    fontWeight: '500',
  },
});
