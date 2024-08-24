import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import Typo from '../../components/text';
import {COLOR} from '../../constant';

type Props = {};

const AccountScreen = (props: Props) => {
  const [isPlatformLogin, setIsPlatformLogin] = useState(false);
  const onPlatformLogin = () => {
    setIsPlatformLogin(!isPlatformLogin);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Typo type="h5">Mã: ahdjsa***</Typo>
        <FaIcon name="eye-slash" size={22} color={COLOR.primary} />
      </View>
      <Typo
        type="h6"
        color={COLOR.secondary}
        styles={{
          fontSize: 18,
        }}>
        HSD: 23/12/2024
      </Typo>
      <View style={{...styles.header, justifyContent: 'flex-start', gap: 10}}>
        <FaIcon name="user" size={20} color={COLOR.primary} />
        <Typo
          type="subtitle1"
          styles={{
            fontWeight: 'bold',
          }}>
          Quản lý tài khoản
        </Typo>
      </View>
      <List.Section
        style={{
          marginTop: 20,
        }}>
        <List.Item
          key="1"
          title={<Typo>Golike</Typo>}
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
                <AntIcon name="like2" size={20} color={COLOR.light} />
              </View>
            </View>
          )}
          description="10 tài khoản"
          right={() => <List.Icon color={COLOR.secondary} icon="arrow-right" />}
        />
        <List.Item
          key="2"
          title={<Typo>Golike</Typo>}
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
                <AntIcon name="like2" size={20} color={COLOR.light} />
              </View>
            </View>
          )}
          description="10 tài khoản"
          right={() => <List.Icon color={COLOR.secondary} icon="arrow-right" />}
        />
        <List.Item
          key="3"
          title={<Typo>Golike</Typo>}
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
                <AntIcon name="like2" size={20} color={COLOR.light} />
              </View>
            </View>
          )}
          description="10 tài khoản"
          right={() => <List.Icon color={COLOR.secondary} icon="arrow-right" />}
        />
        <List.Item
          key="4"
          title={<Typo>Golike</Typo>}
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
                <AntIcon name="like2" size={20} color={COLOR.light} />
              </View>
            </View>
          )}
          description="10 tài khoản"
          right={() => <List.Icon color={COLOR.secondary} icon="arrow-right" />}
        />
      </List.Section>
    </ScrollView>
  );
};

export default AccountScreen;

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
