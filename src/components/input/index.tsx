import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {TextInput, TextInputProps} from 'react-native-paper';
import {COLOR} from '../../constant';

type Props = {
  control: Control<FieldValues, any>;
  rules?: any;
  errors?: any;
  label?: string;
  name: string;
  placeholder?: string;
};

const InputBase = (props: Props & TextInputProps) => {
  const {
    control,
    rules = {},
    errors = {},
    label,
    name,
    placeholder,
    onChange,
    onBlur,
    value,
  } = props;
  return (
    <View>
      <Controller
        control={control}
        rules={rules?.[name] || {}}
        render={({field: {onChange, onBlur}}) => (
          <TextInput
            {...props}
            mode="outlined"
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            onChangeText={value => onChange(value)}
            style={{
              marginTop: 10,
              borderColor: COLOR.primary,
              backgroundColor: '#F1F4FF',
            }}
          />
        )}
        name={name}
      />
      {errors && errors?.[name] && <Text>This is required.</Text>}
    </View>
  );
};

export default InputBase;
