import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {List} from 'react-native-paper';
import {PLATFORM_TYPE} from '../../platform/type';
import Typo from '../text';
import {COLOR} from '../../constant';

export type Account = {
  account_name: string;
  token: string;
  type: PLATFORM_TYPE;
  id: string;
};
const AccountItem = (account: Account) => {
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
      right={() => <List.Icon icon="trash-can-outline" color={'black'} />}
    />
  );
};

export default AccountItem;

const styles = StyleSheet.create({});
