import React from 'react';
import {FieldValues, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import InputBase from '../../components/input';
import Typo from '../../components/text';
import {COLOR} from '../../constant';

const Login = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    return;
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
            name="username"
            errors={errors}
            label="Tài khoản"
          />
          <InputBase
            control={control}
            name="password"
            errors={errors}
            label="Mật khẩu"
          />

          <Button
            mode="contained"
            style={{
              marginTop: 24,
              backgroundColor: COLOR.primary,
            }}
            onPress={handleSubmit(onSubmit)}>
            <Typo
              color={COLOR.light}
              styles={{
                lineHeight: 38,
                fontSize: 20,
                fontFamily: 'Poppins-Bold',
              }}>
              Đăng nhập
            </Typo>
          </Button>

          <View
            style={{
              marginTop: 14,
              flexDirection: 'row',
              gap: 8,
            }}>
            <Typo
              type="subtitle2"
              styles={{
                color: COLOR.secondary,
              }}>
              Bạn chưa có tài khoản!
            </Typo>
            <TouchableOpacity>
              <Typo type="subtitle2">Đăng ký ngay</Typo>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.socialView}>
          <TouchableOpacity key="kh2" style={styles.buttonSocial}>
            <Icon name="google" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity key="kh3" style={styles.buttonSocial}>
            <Icon name="facebook" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity key="kh4" style={styles.buttonSocial}>
            <Icon name="telegram" size={20} color="black" />
          </TouchableOpacity>
        </View> */}
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
export default Login;
