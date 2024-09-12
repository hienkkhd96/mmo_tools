import React from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, List, RadioButton, TextInput} from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import OverlayModule from '../../../src/modules/Overlay';
import Typo from '../../components/text';
import {COLOR} from '../../constant';
import {sendDataToAccess} from '../../modules/Access';
import {CHANNEL_TYPE, PLATFORM_TYPE} from '../../platform/type';
import {useDialogStore} from '../../store/dialog.store';
import {openOtherApp} from '../../utils/openAnotherApp';
import {CONFIG_TYPE, useFetchInitConfig, useFetchSubAccount} from '../hooks';
import {tokenApi} from '../../api/token';
import {useAppStore} from '../../store/app.store';
import {useSnackbarStore} from '../../store/snackbar.store';

type Props = {};

const SettingScreen = (props: Props) => {
  const {token} = useAppStore();
  const snackbar = useSnackbarStore();
  const chanelLinkSchema: Record<CHANNEL_TYPE, string> = {
    tiktok: 'tiktok://',
    shopee: 'shopeevn://',
  };
  const {
    initConfig: formData,
    saveConfig,
    alterConfig: setFormData,
    accounts,
  } = useFetchInitConfig();

  const {subAccounts} = useFetchSubAccount({
    token: formData.platformAccount,
    channel: formData.channel,
    platform: formData.platform,
  });

  const dialog = useDialogStore();
  const handleChangeFormData = (key: keyof CONFIG_TYPE, value: any) => {
    setFormData({
      key: key,
      value: value,
    });
  };
  const handleCheckTokenExpired = async () => {
    try {
      const res = await tokenApi.checkTokenExpired(token || '');
      if (res.data.isExpired === true) {
        snackbar.setMessage('Token đã hết hạn', 'error');
      }
      return res.data.isExpired === true;
    } catch (error) {
      console.log(error);
      snackbar.setMessage('Token đã hết hạng', 'error');
      return true;
    }
  };
  const handleOpenApp = async () => {
    const isTokenExpired = await handleCheckTokenExpired();
    if (isTokenExpired) {
      return;
    }
    const isOverlayOn = await OverlayModule.checkOverlayPermission();
    const isOnAccessibility =
      await OverlayModule.isAccessibilityServiceEnabled();

    if (!isOverlayOn) {
      dialog.setShowDialog(
        'Bạn chua bật tính năng hiển thị trên ứng dụng khác. Nhấn Ok để mở cài đặt ứng dụng',
        {
          action: () => Linking.openSettings(),
        },
      );
    } else if (!isOnAccessibility) {
      dialog.setShowDialog(
        'Bạn chua bật tính năng hỗ trợ cử chỉ. Nhấn Ok để mở cài đặt ứng dụng',
        {
          action: () => OverlayModule.openAccessibilitySettings(),
        },
      );
    } else {
      saveConfig(formData);
      sendDataToAccess(formData);
      OverlayModule.startOverlay();
      openOtherApp(chanelLinkSchema?.[formData.channel]);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <ScrollView style={styles.container}>
        <View style={{...styles.header, justifyContent: 'flex-start', gap: 10}}>
          <FaIcon name="cog" size={20} color={COLOR.primary} />
          <Typo
            type="subtitle1"
            styles={{
              fontWeight: 'bold',
            }}>
            Cấu hình
          </Typo>
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <Typo
            styles={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.primary,
            }}>
            Chọn nền tảng
          </Typo>
          <RadioButton.Group
            onValueChange={newValue =>
              handleChangeFormData('platform', newValue)
            }
            value={formData.platform}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                gap: 10,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  handleChangeFormData('platform', PLATFORM_TYPE.GOLIKE);
                }}>
                <RadioButton value="golike" />
                <Typo>Golike</Typo>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  handleChangeFormData('platform', PLATFORM_TYPE.TDS);
                }}>
                <RadioButton value="tds" />
                <Typo>TDS</Typo>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  handleChangeFormData('platform', PLATFORM_TYPE.TTC);
                }}>
                <RadioButton value="ttc" />
                <Typo>TTC</Typo>
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
        </View>

        <View>
          <Typo
            styles={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.primary,
            }}>
            Chọn tài khoản kiếm tiền
          </Typo>
          <Dropdown
            style={{
              marginTop: 2,
              backgroundColor: '#F1F4FF',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 16,
              borderWidth: 1,
              borderColor: COLOR.primary,
            }}
            itemContainerStyle={{
              borderRadius: 4,
            }}
            value={formData.platformAccount}
            data={accounts.map(account => ({
              value: account.token,
              label: account.account_name,
            }))}
            labelField="label"
            valueField="value"
            onChange={data => {
              handleChangeFormData('platformAccount', data.value);
            }}></Dropdown>
        </View>
        <View>
          <Typo
            styles={{
              marginTop: 20,
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.primary,
            }}>
            Chọn kênh kiếm tiền
          </Typo>
          <Dropdown
            style={{
              marginTop: 2,
              backgroundColor: '#F1F4FF',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 16,
              borderWidth: 1,
              borderColor: COLOR.primary,
            }}
            itemContainerStyle={{
              borderRadius: 4,
            }}
            value={formData.channel}
            data={[
              {
                value: 'tiktok',
                label: 'Tiktok',
              },
              {
                value: 'shopee',
                label: 'Shopee',
              },
            ]}
            labelField={'label'}
            valueField="value"
            onChange={data => {
              handleChangeFormData('channel', data.value);
            }}></Dropdown>
        </View>
        <View>
          <Typo
            styles={{
              marginTop: 20,
              fontSize: 18,
              fontWeight: 'bold',
              color: COLOR.primary,
            }}>
            Chọn tài khoản làm việc
          </Typo>
          <Dropdown
            style={{
              marginTop: 2,
              backgroundColor: '#F1F4FF',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 16,
              borderWidth: 1,
              borderColor: COLOR.primary,
            }}
            itemContainerStyle={{
              borderRadius: 4,
            }}
            value={formData.workAccount}
            data={subAccounts.map(subAccount => ({
              label: subAccount.nickname,
              value: subAccount.id,
            }))}
            labelField={'label'}
            valueField="value"
            onChange={data => {
              handleChangeFormData('workAccount', data.value);
            }}></Dropdown>
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 40,
          }}>
          <List.Accordion
            style={{
              backgroundColor: COLOR.quinary,
              borderRadius: 8,
            }}
            title={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <FaIcon name="cogs" size={20} color={COLOR.primary} />
                <Typo
                  type="subtitle1"
                  styles={{
                    fontWeight: 'bold',
                  }}>
                  Cài đặt nâng cao
                </Typo>
              </View>
            }>
            <TextInput
              mode="outlined"
              label="Dừng sau khi hoàn thành"
              placeholder="VD: 1000"
              value={formData.stopAfterSuccess.toString()}
              onChangeText={text => {
                handleChangeFormData('stopAfterSuccess', text);
              }}
              style={{
                borderColor: COLOR.primary,
                backgroundColor: '#F1F4FF',
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Dừng sau khi thất bại"
              placeholder="VD: 1000"
              value={formData.stopAfterError.toString()}
              onChangeText={text => {
                handleChangeFormData('stopAfterError', text);
              }}
              style={{
                borderColor: COLOR.primary,
                backgroundColor: '#F1F4FF',
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Thời gian nghỉ sau mỗi lần hoàn thành"
              value={formData.timeDelay.toString()}
              onChangeText={text => {
                handleChangeFormData('timeDelay', text);
              }}
              placeholder="VD: 1"
              style={{
                borderColor: COLOR.primary,
                backgroundColor: '#F1F4FF',
                marginBottom: 10,
              }}
            />
          </List.Accordion>
          <Button
            mode="contained"
            onPress={handleOpenApp}
            style={{
              borderRadius: 8,
              paddingVertical: 6,
              elevation: 1,
              marginTop: 10,
            }}>
            Mở App
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SettingScreen;

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
