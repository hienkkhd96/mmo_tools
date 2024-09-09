import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {List} from 'react-native-paper';
import {PLATFORM_TYPE} from '../../platform/type';
import Typo from '../text';
import {COLOR} from '../../constant';
import {Account} from '../../ui/hooks/useFetchAccounts';
import {TouchableOpacity} from 'react-native';
import {platformAccountApi} from '../../api/platform-account';

const AccountItem = (
  account: Account & {
    onRemoveAccount: (type: 'success' | 'error') => void;
  },
) => {
  const handleRemoveAccount = async (id: string) => {
    try {
      const res = await platformAccountApi.removeAccount(id);
      account.onRemoveAccount('success');
    } catch (error) {
      account.onRemoveAccount('error');
    }
  };
  return (
    <List.Item
      key={account.id}
      title={<Typo>{account.account_name}</Typo>}
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
            }}></View>
        </View>
      )}
      right={() => {
        return (
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            onPress={() => handleRemoveAccount(account.id)}>
            <List.Icon icon="trash-can-outline" color={'black'} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default AccountItem;

const styles = StyleSheet.create({});
