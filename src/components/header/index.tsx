import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useAppStore} from '../../store/app.store';
import Typo from '../text';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {COLOR} from '../../constant';
import dayjs from 'dayjs';

type Props = {};

const HeaderLayout = (props: Props) => {
  const {token, expiredAt} = useAppStore();
  const [showToken, setShowToken] = useState<boolean>(false);
  return (
    <View>
      <View style={styles.header}>
        <Typo type="h5">
          Mã: {showToken ? token : token?.slice(0, -8) + '********'}
        </Typo>
        <TouchableOpacity onPress={() => setShowToken(prev => !prev)}>
          {showToken ? (
            <FaIcon name="eye" size={22} color={COLOR.primary} />
          ) : (
            <FaIcon name="eye-slash" size={22} color={COLOR.primary} />
          )}
        </TouchableOpacity>
      </View>
      <Typo
        type="h6"
        color={COLOR.secondary}
        styles={{
          fontSize: 18,
        }}>
        HSD: {dayjs(expiredAt).format('DD/MM/YYYY')}
      </Typo>
    </View>
  );
};

export default HeaderLayout;

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
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
