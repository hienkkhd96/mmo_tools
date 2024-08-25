import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, List, RadioButton, TextInput} from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import Overlay from '../../../src/modules/Overlay';
import Typo from '../../components/text';
import {COLOR} from '../../constant';
import {openOtherApp} from '../../utils/openAnotherApp';
import {useAppStore} from '../../store/app.store';
import {sendDataToAccess} from '../../modules/Access';

type Props = {};
type FormField = {
  platform: string;
  platformAccount: string;
  channel: string;
  workAccount: string;
  stopBeforeSuccess: number;
  stopBeforeError: number;
  timeDelay: number;
};
const SettingScreen = (props: Props) => {
  const token = useAppStore(state => state.token);
  const [formData, setFormData] = useState<FormField>({
    platform: 'golike',
    platformAccount:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nYXRld2F5LmdvbGlrZS5uZXRcL2FwaVwvbG9naW4iLCJpYXQiOjE3MjQ1NjA0NzMsImV4cCI6MTc1NjA5NjQ3MywibmJmIjoxNzI0NTYwNDczLCJqdGkiOiJocTluOHFFMUxWNTNKZ1JRIiwic3ViIjoyNDY4NjEsInBydiI6ImI5MTI3OTk3OGYxMWFhN2JjNTY3MDQ4N2ZmZjAxZTIyODI1M2ZlNDgifQ.jfgavMipl4AqyJxsr0GttSd7wFlexDiA7spmMQEUKv4',
    channel: 'tiktok',
    workAccount: '803733',
    stopBeforeSuccess: 9999,
    stopBeforeError: 9999,
    timeDelay: 5,
  });
  const [accounts, setAccounts] = useState([
    {
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nYXRld2F5LmdvbGlrZS5uZXRcL2FwaVwvbG9naW4iLCJpYXQiOjE3MjQ1NjA0NzMsImV4cCI6MTc1NjA5NjQ3MywibmJmIjoxNzI0NTYwNDczLCJqdGkiOiJocTluOHFFMUxWNTNKZ1JRIiwic3ViIjoyNDY4NjEsInBydiI6ImI5MTI3OTk3OGYxMWFhN2JjNTY3MDQ4N2ZmZjAxZTIyODI1M2ZlNDgifQ.jfgavMipl4AqyJxsr0GttSd7wFlexDiA7spmMQEUKv4',
      type: 'golike',
      account_name: 'test',
    },
  ]);

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
            data={[
              {
                value: '803733',
                label: 'supperhien5',
              },
            ]}
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
            onPress={() => {
              sendDataToAccess(formData);
              Overlay.startOverlay();
              openOtherApp('tiktok://');
            }}
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
