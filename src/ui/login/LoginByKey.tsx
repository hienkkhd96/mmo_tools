import {Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import authApi from '../../api/auth';
import InputBase from '../../components/input';
import Typo from '../../components/text';
import {COLOR} from '../../constant';
import {useAppStore} from '../../store/app.store';
import {useSnackbarStore} from '../../store/snackbar.store';

type Props = {
  navigation: any;
};
const LoginByKey = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      key: '',
    },
  });
  const snackBar = useSnackbarStore();
  const appStore = useAppStore();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await authApi.loginByKey(data.key);
      const loginData = res?.data;
      if (res.status === 200 && loginData?.accessToken) {
        await appStore.setToken({
          token: data.key,
          accessToken: loginData?.accessToken,
          refreshToken: loginData?.refreshToken,
          isAuthenticated: true,
        });
        snackBar.setMessage('Kích hoạt thành công', 'success');
        navigation.navigate('home');
        return;
      } else {
        throw new Error('Kích hoạt thất bại');
      }
    } catch (error: any) {
      snackBar.setMessage('Đăng nhập thất bại', 'error');
    }
    return;
  };
  const handleToRegister = () => {
    navigation.navigate('register');
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View>
          <Text style={styles.text}>Welcome back you’ve</Text>
          <Text style={styles.text}>been missed!</Text>
        </View>
        <View
          style={{
            width: '100%',
          }}>
          <InputBase
            control={control}
            name="key"
            errors={errors}
            label="Mã kích hoạt"
          />

          <Button
            mode="contained"
            style={{
              marginTop: 24,
              backgroundColor: COLOR.primary,
            }}
            labelStyle={{
              fontSize: 24,
              padding: 8,
            }}
            onPress={handleSubmit(onSubmit)}>
            Kích hoạt
          </Button>

          <View
            style={{
              marginTop: 14,
              alignItems: 'center',
            }}>
            <Typo
              type="h6"
              styles={{
                color: COLOR.secondary,
              }}>
              Liên hệ mua key:
            </Typo>
            <Typo type="subtitle1">Zalo: 038.705.4982</Typo>
            <Typo type="subtitle1">Tele: 038.705.4982</Typo>
            <Typo type="subtitle1">Tele: 038.705.4982</Typo>
          </View>
        </View>
        <View style={styles.socialView}>
          <TouchableOpacity style={styles.buttonSocial}>
            <Icon name="snapchat" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSocial}>
            <Icon name="facebook" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSocial}>
            <Icon name="telegram" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
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
  input: {
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
export default LoginByKey;
