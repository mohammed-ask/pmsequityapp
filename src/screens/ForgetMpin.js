import {StyleSheet, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {WebView} from 'react-native-webview';

import LoadingSpinner from '../Components/Loader';

import {baseURL} from '../utils/helpers';

const ForgetMpin = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: `${baseURL}forgotmpin`}}
        startInLoadingState={true}
        renderLoading={() => <LoadingSpinner />}
        onLoadProgress={path => {
          // onNavigationStateChange(path);
        }}
      />
    </View>
  );
};

export default ForgetMpin;
