import React, {useState} from 'react';
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
import {useAppStore} from '../../store/app.store';
import {useDialogStore} from '../../store/dialog.store';
import {
  checkAppInstalled,
  openOtherApp,
  openPlayStore,
} from '../../utils/openAnotherApp';
import {CHANEL_TYPE, PLATFORM_TYPE} from '../../platform/type';
import {sendDataToAccess} from '../../modules/Access';
import {useFetchAccount, useFetchSubAccount} from '../hooks';

type Props = {};
type FormField = {
  platform: PLATFORM_TYPE;
  platformAccount: string;
  channel: CHANEL_TYPE;
  workAccount: string;
  stopBeforeSuccess: number;
  stopBeforeError: number;
  timeDelay: number;
};
const SettingScreen = (props: Props) => {
  const token = useAppStore(state => state.token);
  const channelLinkSchema: Record<CHANEL_TYPE, string> = {
    tiktok: 'tiktok://profile?id=7348173',
  };
  const [formData, setFormData] = useState<FormField>({
    platform: PLATFORM_TYPE.GOLIKE,
    platformAccount:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nYXRld2F5LmdvbGlrZS5uZXRcL2FwaVwvbG9naW4iLCJpYXQiOjE3MjQ2MTA4MjksImV4cCI6MTc1NjE0NjgyOSwibmJmIjoxNzI0NjEwODI5LCJqdGkiOiJhWm8yZXpjd21oOElRQVIxIiwic3ViIjoyNDY4NjEsInBydiI6ImI5MTI3OTk3OGYxMWFhN2JjNTY3MDQ4N2ZmZjAxZTIyODI1M2ZlNDgifQ.ccmeangRab_CQiftK2Kpt5lcd6TlbxIDn0tgoPIetT4',
    channel: CHANEL_TYPE.TIKTOK,
    workAccount: '803733',
    stopBeforeSuccess: 9999,
    stopBeforeError: 9999,
    timeDelay: 5,
  });
  const {accounts} = useFetchAccount({
    platform: formData.platform,
  });
  const {subAccounts} = useFetchSubAccount({
    token: formData.platformAccount,
    chanel: formData.channel,
  });

  const dialog = useDialogStore();

  const handleOpenApp = async () => {
    const isOverlayOn = await OverlayModule.checkOverlayPermission();
    const isInstalled = await checkAppInstalled(
      channelLinkSchema?.[formData.channel],
    );

    const isOnAccessibility =
      await OverlayModule.isAccessibilityServiceEnabled();

    if (!isOverlayOn) {
      dialog.setShowDialog(
        'Bạn chua bật tính năng hiển thị lớp phủ. Nhấn Ok để mở cài đặt ứng dụng',
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
    } else if (isInstalled) {
      openPlayStore('market://details?id=tiktok');
    } else {
      sendDataToAccess(formData);
      OverlayModule.startOverlay();
      openOtherApp(channelLinkSchema?.[formData.channel]);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Typo type="h5">Mã: {token}</Typo>
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
              setFormData(prev => ({...prev, platform: newValue}))
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
                  setFormData(prev => ({...prev, platform: 'golike'}));
                }}>
                <RadioButton value="golike" />
                <Typo>Golike</Typo>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  setFormData(prev => ({...prev, platform: 'tds'}));
                }}>
                <RadioButton value="tds" />
                <Typo>TDS</Typo>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  setFormData(prev => ({...prev, platform: 'ttc'}));
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
            onChange={value => {
              console.log('value selected:', value);
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
            ]}
            labelField={'label'}
            valueField="value"
            onChange={value => {
              console.log('value selected:', value);
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
              value: subAccount.user_id,
            }))}
            labelField={'label'}
            valueField="value"
            onChange={value => {
              console.log('value selected:', value);
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
              value={formData.stopBeforeSuccess.toString()}
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
              value={formData.stopBeforeError.toString()}
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
