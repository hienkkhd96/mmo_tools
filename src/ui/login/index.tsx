import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../../constant';

const Login = ({ navigation }: any) => {
    const handlePress = () => {
        navigation.navigate('home');
        return;
    };
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Đăng nhập</Text>
                <View>
                    <Text style={styles.text}>Welcome back you’ve</Text>
                    <Text style={styles.text}>been missed!</Text>
                </View>
                <TextInput style={styles.imput} placeholder="Mã kích hoạt" />
                <TouchableOpacity onPress={handlePress} style={styles.buttonActive}>
                    <Text style={styles.buttonText}>Kích hoạt</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.text}>Liên hệ mua key</Text>
                    <Text style={styles.text}>Zalo: 038.705.4982</Text>
                    <Text style={styles.text}>Tele: 038.705.4982</Text>
                </View>
                <View style={styles.socialView}>
                    <TouchableOpacity style={styles.buttonSocial}>
                        <Icon name="google" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSocial}>
                        <Icon name="facebook" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSocial}>
                        <Icon name="telegram" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 1,
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60%',
        width: '80%',
    },
    title: {
        fontSize: 30,
        color: COLOR.primary,
        fontFamily: 'Poppins-Bold',
    },
    text: {
        fontSize: 20,
        color: COLOR.secondary,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },
    textPrimary: {
        fontSize: 20,
        color: COLOR.primary,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        width: '100%',
    },
    imput: {
        fontSize: 20,
        paddingHorizontal: 20,
        borderColor: COLOR.primary,
        borderWidth: 2,
        width: '100%',
        maxWidth: 400,
        borderRadius: 10,
        backgroundColor: '#F1F4FF',
        fontFamily: 'Poppins-Regular',
        height: 64,
        margin: 0,
    },
    buttonActive: {
        backgroundColor: COLOR.primary,
        width: '100%',
        height: 64,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-SemiBold',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Poppins-SemiBold',
    },
    socialView: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
        columnGap: 10,
        marginTop: 20,
    },
    buttonSocial: {
        backgroundColor: COLOR.tertiary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 66,
        height: 44,
    },
});
export default Login;
