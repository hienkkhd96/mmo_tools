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
import AntIcon from 'react-native-vector-icons/AntDesign';
import {platformAccountApi} from '../../../api/platform-account';
import InputBase from '../../../components/input';
import Typo from '../../../components/text';
import {COLOR} from '../../../constant';
import {PlatformFactory} from '../../../platform/platform.factory';
import {useSnackbarStore} from '../../../store/snackbar.store';
import {PlatformType} from './PlatformList';
import AccountItem from '../../../components/item/AccountItem';
import {Account} from '../../hooks';

type Props = {
  navigation: any;
  route: any;
};

const AccountList = ({navigation, route}: Props) => {
  const {platformKey, platformName} = route.params;
  if (!platformKey) {
    navigation.goBack();
  }
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      token: '',
    },
  });
  const snackbar = useSnackbarStore();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const onSubmit = async (data: FieldValues) => {
    try {
      const platform = PlatformFactory.createPlatform(data.token, platformKey);
      const res = await platform.getMe();

      if (res.data && res.status === 200) {
        const resAddAccount = await platformAccountApi.addAccount({
          accountName: res.data?.data?.username,
          token: data.token,
          type: platformKey,
        });
        console.log(resAddAccount);

        if (resAddAccount.status === 200 || resAddAccount.status === 201) {
          snackbar.setMessage('Thêm tài khoản thành công', 'success');
          fetchAccounts();
        } else {
          throw new Error(res.data);
        }
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        snackbar.setMessage('Token không hợp lệ!', 'error');
        return;
      }
      snackbar.setMessage(
        typeof error === 'string'
          ? error
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
      case 'error':
        snackbar.setMessage('Xoá tài khoản thất bại.', type);
      default:
        return;
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, [platformKey]);
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
        <InputBase
          control={control}
          errors={errors}
          label="Token"
          placeholder="Điền token"
          name="token"
        />
        <Button
          onPress={handleSubmit(onSubmit)}
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
