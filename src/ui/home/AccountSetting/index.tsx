import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderLayout from '../../../components/header';
import {Button} from 'react-native-paper';
import authApi from '../../../api/auth';
import {useAppStore} from '../../../store/app.store';
import {useSnackbarStore} from '../../../store/snackbar.store';

type Props = {};

const AccountSettingScreen = (props: Props) => {
  const {token, logout} = useAppStore();
  const snackbar = useSnackbarStore();
  const handleLogout = async () => {
    try {
      const res = await authApi.logout();
      console.log(res);
      await logout();
    } catch (error) {
      console.log(error);
      snackbar.setMessage('Đăng xuất thất bại', 'error');
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <HeaderLayout />
        <Button
          mode="contained"
          onPress={handleLogout}
          labelStyle={{
            fontSize: 18,
            paddingVertical: 6,
          }}>
          Đăng xuất
        </Button>
      </View>
    </View>
  );
};

export default AccountSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    height: '100%',
  },
});
