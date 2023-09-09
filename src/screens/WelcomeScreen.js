import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import AButton from '../Components/Button';
import Colors from '../constants/Colors';
import NavigationConstants from '../navigation/NavigationConstants';

const { width, height } = Dimensions.get('window');

const IntroductionScreens = ({ navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        {
            title: 'Investing for Everybody',
            text: 'We let you easily invest in any shares for as litter as ₹100.',
            image: require('../assets/image1.png'),
        },
        {
            title: 'Get Better Returns',
            text: 'Invest in the India\'s leading brands and get better return',
            image: require('../assets/image2.png'),
        },
    ];

    const handleIndexChanged = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <Swiper loop={false}
                activeDotStyle={activeIndex === 1 ? styles.activeDotStyleActive : styles.activeDotStyle}
                dotStyle={activeIndex === 1 ? styles.dotStyleActive : styles.dotStyle}
                containerStyle={{ backgroundColor: Colors.whiteColor }}
                onIndexChanged={handleIndexChanged}>
                {slides.map((slide, index) => (
                    <View key={index} style={styles.slide}>
                        <Image source={slide.image} style={styles.image} />
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.text}>{slide.text}</Text>
                    </View>
                ))}
            </Swiper>
            <View style={styles.logincontainer}>
                <AButton onPress={() => navigation.navigate(NavigationConstants.LOGIN)} style={{ backgroundColor: Colors.transparent, borderColor: Colors.primaryColor, borderRadius: 10, height: 50, borderWidth: 1 }} buttonTextStyle={{ color: Colors.primaryColor }} title={'Login'} />
                <AButton onPress={() => navigation.navigate(NavigationConstants.REGISTER)} style={{ backgroundColor: Colors.primaryColor, height: 50 }} title={'Get Started'} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,

    },
    logincontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 40,
        paddingBottom: 50,
        flex: 0.1,
        backgroundColor: Colors.whiteColor
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 30,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        color: '#C0C0C0',
        marginHorizontal: 30,
        textAlign: 'center'
    },
    dotStyle: {
        width: 25,
        marginRight: 0,
        marginLeft: 0,
        borderRadius: 0,
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,

    },
    activeDotStyle: {
        marginLeft: 0,
        marginRight: 0,
        width: 25,
        borderRadius: 0,
        backgroundColor: Colors.primaryColor,
        borderBottomStartRadius: 10,
        borderTopLeftRadius: 10,
    },
    dotStyleActive: {
        // Adjust the dot style for the second slide
        // For example:
        width: 25,
        marginRight: 0,
        marginLeft: 0,
        borderRadius: 0,
        borderBottomStartRadius: 10,
        borderTopLeftRadius: 10,
    },
    activeDotStyleActive: {
        // Adjust the active dot style for the second slide
        // For example:
        marginLeft: 0,
        marginRight: 0,
        width: 25,
        borderRadius: 0,
        backgroundColor: Colors.primaryColor,
        // borderBottomStartRadius: 0,
        // borderTopLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,
    },
});

export default IntroductionScreens;