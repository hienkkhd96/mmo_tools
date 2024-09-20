import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, List} from 'react-native-paper';
import {platformAccountApi} from '../../../api/platform-account';
import AccountItem from '../../../components/item/AccountItem';
import Typo from '../../../components/text';
import {COLOR} from '../../../constant';
import {PlatformFactory} from '../../../platform/platform.factory';
import {useSnackbarStore} from '../../../store/snackbar.store';
import {Account} from '../../hooks';
import InputBase from '../../../components/input';

type Props = {
  navigation: any;
  route: any;
};

const AccountList = ({navigation, route}: Props) => {
  const {platformKey, platformName, token} = route.params;
  if (!platformKey) {
    navigation.goBack();
    return;
  }
  const snackbar = useSnackbarStore();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      token: '',
    },
  });
  const addAccounts = async () => {
    try {
      const accessToken = watch('accessToken') || token;
      if (!accessToken) {
        snackbar.setMessage('Vui lòng điền token', 'error');
        return;
      }
      const platform = PlatformFactory.createPlatform(accessToken, platformKey);

      const res = await platform.getMe();
      console.log('platform', res.data);

      if (res.data && res.status === 200 && res.data?.status !== 'fail') {
        const fieldsOptions = platform.getFieldsOptions();
        const resAddAccount = await platformAccountApi.addAccount({
          accountName: res.data?.data?.[fieldsOptions.username],
          token: accessToken,
          type: platformKey,
        });

        if (resAddAccount.status === 200 || resAddAccount.status === 201) {
          snackbar.setMessage('Thêm tài khoản thành công', 'success');
          navigation.replace('accounts', {
            platformKey: platformKey,
            platformName: platformName,
          });
        } else {
          snackbar.setMessage(
            typeof resAddAccount.data === 'string'
              ? resAddAccount.data
              : resAddAccount.data?.message ||
                  'Thêm tài khoản thất bại. Vui lòng kiểm tra lại.',
            'error',
          );
        }
        return;
      }
      throw res.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        snackbar.setMessage('Token không hợp lệ!', 'error');
        return;
      }
      snackbar.setMessage(
        typeof error?.response?.data?.message === 'string'
          ? error?.response?.data?.message
          : error?.message || 'Thêm tài khoản thát bại. Vui lòng kiểm tra lại.',
        'error',
      );
    }
  };
  const fetchAccounts = async () => {
    try {
      const res = await platformAccountApi.getAccounts(platformKey);
      setAccounts(res.data);
    } catch (error: any) {
      snackbar.setMessage(
        typeof error === 'string'
          ? error
          : error?.message ||
              'Lấy danh sách tài khoản thất bại. Vui lòng kiểm tra lại.',
        'error',
      );
    }
  };
  const onRemoveAccount = (type: 'success' | 'error') => {
    switch (type) {
      case 'success':
        snackbar.setMessage('Xoá tài khoản thành công.', type);
        fetchAccounts();
        break;
      case 'error':
        snackbar.setMessage('Xoá tài khoản thất bại.', type);
        fetchAccounts();
        break;
      default:
        return;
    }
  };
  const handleAddAccount = () => {
    if (platformKey === 'golike') {
      navigation.navigate('login-golike');
    } else {
      addAccounts();
    }
  };
  useEffect(() => {
    fetchAccounts();
    if (token) {
      addAccounts();
    }
  }, [platformKey, token]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Typo type="h6">{platformName || platformKey}</Typo>
        </View>
        <List.Section>
          {accounts.map(account => {
            return (
              <AccountItem
                account_name={account.account_name}
                token={account.token}
                id={account.id}
                type={platformKey}
                key={account.id}
                onRemoveAccount={onRemoveAccount}
              />
            );
          })}
        </List.Section>
      </ScrollView>

      <View
        style={{
          marginBottom: 10,
          padding: 16,
        }}>
        {platformKey !== 'golike' && (
          <InputBase
            control={control}
            errors={errors}
            label="Token"
            placeholder="Điền token"
            name="accessToken"
            value={watch('accessToken')}
          />
        )}
        <Button
          onPress={handleAddAccount}
          mode="contained"
          labelStyle={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLOR.light,
            padding: 5,
          }}
          style={{
            marginTop: 10,
          }}>
          Thêm tài khoản
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AccountList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
});
