import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Typo from '../../../components/text';
import {COLOR} from '../../../constant';
import {PlatformType} from './PlatformList';

type Props = {
  navigation: any;
  route: any;
};

const AccountList = ({navigation, route}: Props) => {
  const {platformKey, platformName} = route.params;
  if (!platformKey) {
    navigation.goBack();
  }

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
  );
};

export default AccountList;

const styles = StyleSheet.create({
  container: {
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
