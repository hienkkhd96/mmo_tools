import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Typo from '../../components/text';
import {COLOR} from '../../constant';

type Props = {
  onPlatformLogin: () => void;
};

const ReportScreen = () => {
  const handlePress = () => {
    return;
  };
  return (
    <View>
      <TextInput
        mode="outlined"
        label="Tài khoản"
        placeholder="Tài khoản đăng nhập golike"
        style={{
          marginTop: 10,
          borderColor: COLOR.primary,
          backgroundColor: '#F1F4FF',
        }}
      />
      <TextInput
        label="Mật khẩu"
        mode="outlined"
        secureTextEntry
        placeholder="Mật khẩu đăng nhập golike"
        style={{
          marginTop: 10,
          borderColor: COLOR.primary,
          backgroundColor: '#F1F4FF',
        }}
        right={<TextInput.Icon icon="eye" />}
      />
      <Button
        mode="contained"
        style={{
          marginTop: 10,
          backgroundColor: COLOR.primary,
        }}
        onPress={handlePress}>
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
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({});
