import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Share,
  TouchableOpacity,
} from 'react-native';
import IconCart from 'react-native-vector-icons/SimpleLineIcons';
import IconSetting from 'react-native-vector-icons/Feather';
import IconFavorite from 'react-native-vector-icons/MaterialIcons';
import ProfileItem from './ProfileItem/ProfileItem';
import FormOrder from './ProfileItem/myOrder';
import { Avatar } from 'react-native-paper';
import Gift from './ProfileItem/Gift';
import { signOut } from '../../utils/user';
import { useLogin } from '../../Context/LoginProvider';
import Service from './ServiceItem/Service';
import MyService from './ServiceItem/myService';
import InfomationArtWear from './ProfileItem/infomationArtWear';
import { useScroll } from '../../Context/ScrollContext';
const artwear = require('../../assets/images/Banner/SplashScreen.jpg');
const { height, width } = Dimensions.get('window');
const ProfileHaveAccount = ({ navigation, route }) => {
  const { setIsLoggedIn, profile, fetchUser } = useLogin();
  const { ScrollingProfile, setScrollingProfile } = useScroll();
  const [orderList, setorderList] = useState([]);
  const [checkorder, setcheckorder] = useState([]);
  const onShare = () => {
    try {
      const result = Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (ScrollingProfile) {
    fetchUser()
    setScrollingProfile(false)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <IconSetting
              name="settings"
              size={24}
              style={styles.iconSetting}
              // onPress={setting}
              onPress={() =>
                navigation.navigate('UserNavigator', { screen: 'Setting' })
              }
            />
            <IconCart
              name="handbag"
              size={24}
              style={styles.iconCart}
              // onPress={Cart}
              onPress={() =>
                navigation.navigate('CartNavigator', { screen: 'Cart' })
              }
            />
            <IconFavorite
              name="favorite-outline"
              size={28}
              style={styles.iconFavorite}
            />
          </View>
        </View>
        {/* Information */}
        <SafeAreaView style={styles.headerWrapper}>
          <View style={styles.splash}>
            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                {profile ? (
                  <Avatar.Image
                    source={{
                      uri: profile
                        ? profile.avatar ||
                        'https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg'
                        : 'https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg',
                    }}
                    size={90}
                  />
                ) : null}
                <View style={styles.userText}>
                  <Text style={styles.userName}>{profile.fullname}</Text>
                  <Text style={styles.userEmail}>{profile.email}</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>

        {/* MyOrder */}
        <View style={styles.content}>
          {/* ????n h??ng c???a t??i */}
          <ProfileItem
            icon="form-select"
            name="????n h??ng c???a t??i"
            iconright="angle-right"
            onPress={() => navigation.navigate('TabView')}
          />
          {/* Line g???ch ngang */}
          <View style={styles.divider} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Ch??? thanh to??n */}
            <FormOrder
              icon="wallet"
              name={`Ch??? thanh \n     to??n`}
              onPress={() =>
                navigation.navigate('TabView', { screen: 'Ch??? thanh to??n' })
              }
            />
            {/* X??? l?? h??ng */}
            <FormOrder
              icon="cube-outline"
              name={`X??? l?? h??ng`}
              onPress={() =>
                navigation.navigate('TabView', { screen: 'X??? l?? h??ng' })
              }
            />
            {/* ??ang v???n chuy???n */}
            <FormOrder
              icon="truck-fast-outline"
              name={` ??ang v???n \n   chuy???n`}
              onPress={() =>
                navigation.navigate('TabView', { screen: '??ang v???n chuy???n' })
              }
            />
            {/* ????nh gi?? */}
            <FormOrder
              icon="emoticon-excited-outline"
              name={` ????nh gi??`}
              onPress={() =>
                navigation.navigate('TabView', { screen: '???? giao' })
              }
            />
          </View>
        </View>

        {/* Gift */}
        <Gift navigation={navigation} />

        {/* D???ch v??? c???a t??i */}
        <View style={styles.Service}>
          <MyService icon="charity" name="D???ch v??? c???a t??i" />
          {/* h??ng 1 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Service icon="help-circle-outline" name={`Tr??? gi??p `} />
            <Service icon="brightness-percent" name={`Voucher`} />
            <Service icon="wallet-outline" name={`V?? ti???n `} />
            <Service icon="cash-usd-outline" name={`N???p th??? `} />
            <Service icon="card-text-outline" name={`????nh gi?? `} />
          </View>
          {/* h??ng 2 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Service icon="assistant" name={`??u ????i `} />
            <Service icon="diamond-stone" name={`S??n kim\n c????ng`} />
            <Service icon="headphones" name={`Ch??m s??c`} />
            <Service icon="form-select" name={`B??n c??ng\n ArtWear `} />
            <Service icon="share-variant" name={`Chia s??? `} onPress={onShare} />
          </View>
        </View>
        {/* Th??ng tin v??? BT Style */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserNavigator', { screen: 'InfomationArtWear' })
          }>
          <View style={styles.contentArtWear}>
            <InfomationArtWear
              img={artwear}
              name="Th??ng tin v??? BT Style"
              iconright="angle-right"
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
  },
  headerWrapper: {
    backgroundColor: '#FFFCF2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFCF2',
  },
  iconCart: {
    color: '#000',
    marginRight: 15,
  },
  iconSetting: {
    color: '#000',
    marginRight: 15,
  },
  iconFavorite: {
    color: '#000',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  userText: {
    marginLeft: 120,
    marginTop: -70,
  },
  userName: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -20,
  },
  userEmail: {
    color: '#000',
    fontSize: 18,
  },
  splash: {
    paddingTop: 60,
    paddingBottom: 120,
  },
  content: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: -100,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  contentGif: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    height: height / 3.6,
  },
  contentArtWear: {
    marginHorizontal: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  Service: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d2d2d',
    paddingVertical: 20,
  },
  //Information User
  userInfoSection: {
    paddingHorizontal: 10,
    marginTop: -40,
  },
  row: {
    marginVertical: 20,
    marginTop: -20,
  },
  //Line g???ch ngang
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginLeft: 1,
    margin: 5,
  },
});

export default ProfileHaveAccount;
