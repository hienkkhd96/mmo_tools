import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Snackbar} from 'react-native-paper';
import {useSnackbarStore} from '../../store/snackbar.store';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};

const SnackBarGlobal = (props: Props) => {
  const {isShow, message, type, closeSnackbar} = useSnackbarStore();
  const icons = {
    info: <MuiIcon name="information-outline" size={24} color="white" />,
    success: <MuiIcon name="check-circle" size={24} color="white" />,
    warning: <MuiIcon name="alert-circle" size={24} color="white" />,
    error: <MuiIcon name="close-circle" size={24} color="white" />,
  };

  return (
    <View style={styles.container}>
      <Snackbar visible={isShow} onDismiss={closeSnackbar} style={styles[type]}>
        <View style={styles.content}>
          {icons[type]}
          <Text style={styles.text}>{message}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={closeSnackbar}>
          <MuiIcon
            name="close"
            size={24}
            color="white"
            onPress={closeSnackbar}
          />
        </TouchableOpacity>
      </Snackbar>
    </View>
  );
};

export default SnackBarGlobal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  info: {
    backgroundColor: '#2196F3',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  success: {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  warning: {
    backgroundColor: '#FFC107',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  error: {
    backgroundColor: '#F44336',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: 'transparent',
    elevation: 0,
    zIndex: 1000,
  },
});
