import React, {ReactNode, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Typo from '../../../components/text';
import {COLOR} from '../../../constant';
import {useAppStore} from '../../../store/app.store';
import HeaderLayout from '../../../components/header';

type Props = {
  navigation: any;
};
export type PlatformType = {
  name: string;
  key: string;
  icon: ReactNode;
  totalAccounts?: number;
};
const PlatformList = ({navigation}: Props) => {
  const [isPlatformLogin, setIsPlatformLogin] = useState(false);
  const onPlatformLogin = () => {
    setIsPlatformLogin(!isPlatformLogin);
  };
  const token = useAppStore(state => state.token);

  const hadlePressPlatform = (platform: PlatformType) => {
    navigation.navigate(`accounts`, {
      platformKey: platform.key,
      platformName: platform.name,
    });
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
    <ScrollView style={styles.container}>
      <HeaderLayout />
      <View style={{...styles.header, justifyContent: 'flex-start', gap: 10}}>
        <MuiIcon name="database-cog" size={20} color={COLOR.primary} />
        <Typo
          type="subtitle1"
          styles={{
            fontWeight: 'bold',
          }}>
          Quản lý nền tảng
        </Typo>
      </View>
      <List.Section
        style={{
          marginTop: 20,
        }}>
        {platformList.map(platform => {
          return (
            <List.Item
              key={platform.key}
              title={<Typo>{platform.name}</Typo>}
              style={{
                paddingHorizontal: 10,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: COLOR.tertiary,
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
                <List.Icon color={COLOR.secondary} icon="arrow-right" />
              )}
              onPress={() => hadlePressPlatform(platform)}
            />
          );
        })}
      </List.Section>
    </ScrollView>
  );
};

export default PlatformList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
});
