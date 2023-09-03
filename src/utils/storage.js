import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkUserLoginStorage = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const userDetails = await AsyncStorage.getItem('userData');
    const userUAC = await AsyncStorage.getItem('userUAC');

    return {
        token,
        userDetails: JSON.parse(userDetails),
        uac: JSON.parse(userUAC),
    };
};

export const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    return token
};

export const getValue = async (key) => {
    var data = '';
    try {
        const storageToken = await AsyncStorage.getItem(key);
        if (storageToken !== null) {
            data = storageToken;
        }
    } catch (e) {
        // Error
    }
    return data;
};

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log('e', e)
        // saving error
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log('e', e)
        // saving error
    }
};
export const clearStorage = async () => {
    try {
        AsyncStorage.clear()
    } catch (e) {
        console.log('e', e)
        // saving error
    }
};
