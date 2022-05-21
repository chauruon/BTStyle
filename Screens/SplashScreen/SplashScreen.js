import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {useLogin} from './../../Context/LoginProvider';
var logo = require('../../assets/images/FlashScreen.png');

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SplashScreen = ({navigation}) => {
  const {setLoading} = useLogin();
  setTimeout(() => {
    //navigation chuyển qua trang Main(Bottom navigation)
    setLoading(true);
    // navigation.navigate('Main');
    //5s chuyển qua Main
  }, 4000);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: height,
    width: width,
  },
});

export default SplashScreen;
