import React, { Fragment, useState, useEffect } from 'react';
// import { Colors, Caption } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { Text, View } from 'react-native'
// import * as Animatable from 'react-native-animatable';
// import { NET_OFF, NET_ON } from '../../store/reducer/alert';

const NetinfoAlert = () => {
    const [isOpen, setisOpen] = useState(false);
    useEffect(() => {
        NetInfo.addEventListener(networkState => {
            {
                !networkState.isConnected
                    ? (setisOpen(true))
                    : (setisOpen(false));
            }
        });
    }, []);

    return (
        <Fragment>
            {isOpen ? (
                <View
                    animation="fadeIn"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        zIndex: 9999,
                        width: '100%',
                        padding: 5,
                        backgroundColor: 'red',
                    }}>
                    <Text
                        style={{ color: '#fff', paddingBottom: 0, textAlign: 'center' }}>
                        No Internet Connection
                    </Text>
                </View>
            ) : null}
        </Fragment>
    );
};

export default NetinfoAlert;
