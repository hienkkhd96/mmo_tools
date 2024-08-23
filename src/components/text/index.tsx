import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {COLOR} from '../../constant';

type Props = {
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2';
  children: React.ReactNode;
  color?: string;
  styles?: StyleProp<any>;
};

const Typo = (props: Props) => {
  const {type = 'subtitle1', children, color, styles: typoStyles = {}} = props;
  return (
    <Text
      style={{
        ...styles[`${type}Style`],
        color: color || COLOR.primary,
        ...typoStyles,
        fontFamily: 'Poppins-Regular',
      }}>
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({
  h1Style: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  h2Style: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  h3Style: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  h4Style: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  h5Style: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  h6Style: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle1Style: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
  subtitle2Style: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  body1Style: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  body2Style: {
    fontSize: 12,
    fontWeight: 'normal',
  },
});
