import React, {useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Typo from '../../../components/text';
import {COLOR} from '../../../constant';
import {PlatformType} from './PlatformList';
import {KeyboardAvoidingView} from 'react-native';
import InputBase from '../../../components/input';
import {FieldValues, useForm} from 'react-hook-form';
import {openOtherApp} from '../../../utils/openAnotherApp';
import {PlatformFactory} from '../../../platform/platform.factory';
import {PLATFORM_TYPE} from '../../../platform/type';
import {useSnackbarStore} from '../../../store/snackbar.store';
import {platformAccountApi} from '../../../api/platform-account';

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
  const onSubmit = async (data: FieldValues) => {
    try {
      const platform = PlatformFactory.createPlatform(data.token, platformKey);
      const res = await platform.getMe();
      if (res.data && res.status === 200) {
        const accountRes = await platformAccountApi.addAccount(data.token);
        console.log(accountRes);
        snackbar.setMessage('Thêm tài khoản thành công', 'success');
      }
      console.log(res.data);
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
  const platformList: PlatformType[] = [
    {
      name: 'Golike',
      key: 'golike',
      icon: <AntIcon name="like2" size={20} color={COLOR.light} />,
      totalAccounts: 10,
    },
    {
      name: 'Trao đổi sub',
      key: 'tds',
      icon: <AntIcon name="like2" size={20} color={COLOR.light} />,
      totalAccounts: 10,
    },
    {
      name: 'Tương tác chéo',
      key: 'ttc',
      icon: <AntIcon name="like2" size={20} color={COLOR.light} />,
      totalAccounts: 10,
    },
  ];
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
          {platformList.map(platform => {
            return (
              <List.Item
                key={platform.key}
                title={<Typo>{platform.name}</Typo>}
                style={{
                  paddingHorizontal: 10,
                  borderTopWidth: 1,
                  borderTopColor: COLOR.tertiary,
                }}
                left={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 15,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 38,
                        height: 38,
                        borderRadius: 15,
                        backgroundColor: COLOR.primary,
                      }}>
                      {platform.icon}
                    </View>
                  </View>
                )}
                description={`${platform.totalAccounts} tài khoản`}
                right={() => (
                  <List.Icon icon="trash-can-outline" color={'black'} />
                )}
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
