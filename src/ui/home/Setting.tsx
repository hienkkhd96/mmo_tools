import React from 'react';
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
import Typo from '../../components/text';
import {COLOR} from '../../constant';
import {openOtherApp} from '../../utils/openAnotherApp';
import Overlay from '../../../src/modules/Overlay';
import {clickOnOtherApp, sendDataToAccess} from '../../modules/Access';

type Props = {};

const SettingScreen = (props: Props) => {
  const [value, setValue] = React.useState('golike');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
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
            onValueChange={newValue => setValue(newValue)}
            value={value}>
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
                  setValue('golike');
                }}>
                <RadioButton value="golike" />
                <Typo>Golike</Typo>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  setValue('sub');
                }}>
                <RadioButton value="sub" />
                <Typo>TDS</Typo>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  setValue('activity');
                }}>
                <RadioButton value="activity" />
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
            value={'golike'}
            data={[
              {
                value: 'golike',
                label: 'Golike',
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
            value={'golike'}
            data={[
              {
                value: 'golike',
                label: 'Golike',
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
            value={'golike'}
            data={[
              {
                value: 'golike',
                label: 'Golike',
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
              style={{
                borderColor: COLOR.primary,
                backgroundColor: '#F1F4FF',
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Thời gian nghỉ sau mỗi lần hoàn thành"
              placeholder="VD: 1000"
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
