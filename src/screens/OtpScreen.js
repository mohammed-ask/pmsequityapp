import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OtpInputs from 'react-native-otp-inputs';
import {baseURL, windowHeight, windowWidth} from '../utils/helpers';
import {getValue} from '../utils/storage';
import AppText from '../Components/AppText';
import AButton from '../Components/Button';
import NavigationConstants from '../navigation/NavigationConstants';
import Colors from '../constants/Colors';
import {StackActions} from '@react-navigation/native';

const OtpScreen = ({navigation, setMpin, handleForgotMpin}) => {
  const [load, setLoad] = useState(true);
  const [MpinCode, setMpinCode] = useState(null);
  const getMpin = async uid => {
    const data = await fetch(`${baseURL}api/getmpin?userid=${uid}`, {
      //mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      // body: JSON.stringify({
      //     userid: '47',
      // }),
    });
    const da = await data.json();

    return da.mpin;
  };

  const setHandleOtp = async code => {
    setMpinCode(code);
  };
  console.log(MpinCode, 'opop');
  const handleOtp = async code => {
    const data = await getValue('SignInData');
    console.log(data);
    const nd = JSON.parse(data);
    const decodedString = decodeURIComponent(nd.userData.value);
    // Step 2: Parse the JSON
    const jsonObject = JSON.parse(decodedString);
    // Access the userid value
    const userId = jsonObject.userid;
    if (MpinCode.length === 6) {
      console.log(MpinCode);
      const mpin = await getMpin(userId);
      console.log(mpin, MpinCode);
      if (mpin == MpinCode) {
        setMpin(true);
      } else {
        alert('MPIN is incorrect');
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '90%',
          height: 400,
          backgroundColor: 'white',
          justifyContent: 'space-around',
          alignItems: 'center',
          elevation: 6,
          borderRadius: 10,
        }}>
        <Image
          source={require('../assets/pmslogo.png')}
          style={{width: '100%', height: 50, resizeMode: 'contain'}}
        />
        <View>
          <AppText
            style={{
              marginLeft: 10,
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            ENTER MPIN
          </AppText>
          <OtpInputs
            handleChange={async code => {
              await setHandleOtp(code);
            }}
            numberOfInputs={6}
            autofillFromClipboard={false}
            style={styles.otpInputStyle}
            inputContainerStyles={styles.otpBoxStyle}
            inputStyles={styles.otpTextStyle}
            autoFocus={true}
            selectionColor={'#045097'}
          />
          <AButton
            onPress={async () => {
              await handleOtp();
            }}
            style={{
              backgroundColor: Colors.primaryColor,
              height: 40,
              marginTop: 30,
              width: '100%',
            }}
            title={'Click to Enter Dashboard'}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                StackActions.replace(NavigationConstants.FORGETMPIN),
              )
            }
            style={{alignSelf: 'center', marginTop: 20}}>
            <AppText
              style={{
                color: Colors.primaryColor,
                textDecorationLine: 'underline',
              }}>
              Forgot MPIN?
            </AppText>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  otpBoxStyle: {
    margin: 10,
    borderBottomColor: '#045097',
    borderBottomWidth: 3,
    width: 30,
  },
  otpTextStyle: {
    color: '#000',
    fontSize: 28,
    fontWeight: '400',
    top: Platform.OS === 'android' ? 10 : 0,
    alignSelf: 'center',
  },
  otpContainerStyle: {
    marginTop:
      windowHeight > 700 && windowWidth < 500
        ? 50
        : windowWidth > 500
        ? 20
        : 10,
    alignSelf: 'center',
  },
  otpInputStyle: {
    flexDirection: 'row',
    // height: 60,
    // alignSelf: 'center'
  },
});
