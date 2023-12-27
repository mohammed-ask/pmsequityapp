import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import LoadingSpinner from '../Components/Loader';
import {getValue, storeData} from '../utils/storage';
import Header from '../layout/Header';
import NetInfo from '@react-native-community/netinfo';
import NetinfoAlert from '../Components/NetInfo';
import {baseURL} from '../utils/helpers';
import CookieManager from '@react-native-cookies/cookies';
import {StackActions} from '@react-navigation/native';

let pageSubmit = 2;
const HomeScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [mpin, setMpin] = useState(false);
  const [load, setLoad] = useState(true);
  const webViewRef = React.useRef(null);

  const runscript = async data => {
    const {nativeEvent} = data;
    if (nativeEvent.url.includes('https://pmsequity.online/portfolio')) {
      navigation.navigate('Portfolio', {query: '#aistock'});
      return;
    }
    if (pageSubmit % 2 === 0) {
      console.log('firsttime');
      const data = await getValue('SignInData');
      // const data = JSON.stringify(postData);
      const script = `
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '${baseURL}dashboard';

                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'postData';
                input.value = ${data};

                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
              `;
      webViewRef.current.injectJavaScript(script);
      if (pageSubmit > 3) {
        setLoad(true);
      }
      setTimeout(() => {
        setLoad(false);
      }, 1000);
      pageSubmit = pageSubmit + 1;
    } else {
      console.log('secondtime');
      pageSubmit = pageSubmit + 1;

      // setLoad(true)
      // setTimeout(() => {
      // }, 2000)
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    webViewRef.current.reload();
    setLoad(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const clearCookies = async () => {
    try {
      await CookieManager.clearAll();
      console.log('Cookies cleared successfully');
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  };

  const handlelogout = () => {
    removeData('SignInData');
    clearCookies();
    navigation.dispatch(
      StackActions.replace(NavigationConstants.WELCOME_SCREEN, {}),
    );
  };

  const onNavigationStateChange = path => {
    const url = path.nativeEvent.url;
    console.log(url, '---', pageSubmit);
    if (url === `${baseURL}login` || url === `${baseURL}admin/adminlogin`) {
      handlelogout();
    }
  };

  const handleForgotMpin = () => {
    // setForgotMpin(true)
    onNavigationStateChange(`${baseURL}login`);
  };
  // console.log(load, 'dd')
  if (!mpin) {
    return (
      <OtpScreen
        handleForgotMpin={handleForgotMpin}
        navigation={navigation}
        setMpin={setMpin}
      />
    );
  }
  return (
    <View style={{flex: 1}}>
      {/* <ScrollView style={{ maxHeight: 60, backgroundColor: 'pink' }} scrollEnabled={false}>
                <Header navigation={navigation} />
            </ScrollView> */}
      {/* {load ? <LoadingSpinner /> : null} */}
      <WebView
        source={{uri: `${baseURL}dashboard`}}
        // onLoad={runscript}
        ref={webViewRef}
        startInLoadingState={true}
        onLoadProgress={path => {
          onNavigationStateChange(path);
        }}
        renderLoading={() => <LoadingSpinner />}
      />
    </View>
  );
};

export default HomeScreen;
