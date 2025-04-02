import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface LogoProps {
  size?: number;
  style?: ImageStyle;
}

const Logo: React.FC<LogoProps> = ({ size = 80, style }) => {
  return (
    <Image
      source={require('./EasyFitLogo.png')}
      style={[
        styles.image,
        {
          width: size,
          height: size,
        },
        style
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Logo; 