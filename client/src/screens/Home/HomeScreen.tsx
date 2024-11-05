import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './HomeScreen.styles';
import TtubeotProfile from '../../components/TtubeotProfile';
import CurrencyDisplay from '../../components/CurrencyDisplay.tsx';
import CharacterShopModal from '../../components/CharacterShop/CharacterShopModal';
import GraduationAlbumModal from '../../components/GraduationAlbum/GraduationAlbumModal';
import MissionModal from '../../components/Mission/MissionModal.tsx';
import WebView from 'react-native-webview';
import ButtonDefault from '../../components/Button/ButtonDefault.tsx';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FriendsModal from '../../components/Friends/FriendsModal.tsx';
import BLE from '../../components/BLE/BLEModal.tsx';
import BLEModal from '../../components/BLE/BLEModal.tsx';

const background = require('../../assets/images/HomeBackground.jpg');
const ShopIcon = require('../../assets/icons/ShopIcon.png');
const MissionIcon = require('../../assets/icons/MissionIcon.png');
const AlbumIcon = require('../../assets/icons/AlbumIcon.png');
const FriendIcon = require('../../assets/icons/FriendIcon.png');
const MapIcon = require('../../assets/icons/MapIcon.png');

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [graduationAlbumModalVisible, setGraduationAlbumModalVisible] =
    useState(false);
  const [missionModalVisible, setMissionModalVisible] = useState(false);
  const [friendsModalVisible, setFriendsModalVisible] = useState(false);
  const navigation = useNavigation();
  const [BLEModalVisible, setBLEModalVisible] = useState(false);

  const openShopModal = () => {
    setModalVisible(true);
  };

  const closeShopModal = () => {
    setModalVisible(false);
  };

  const openAlbumModal = () => {
    setGraduationAlbumModalVisible(true);
  };

  const closeAlbumModal = () => {
    setGraduationAlbumModalVisible(false);
  };

  const openMissionModal = () => {
    setMissionModalVisible(true);
  };

  const closeMissionModal = () => {
    setMissionModalVisible(false);
  };

  const openFriendsModal = () => {
    setFriendsModalVisible(true);
  };

  const closeFriendsModal = () => {
    setFriendsModalVisible(false);
  };

  const openBLEModal = () => {
    setBLEModalVisible(true);
  };

  const closeBLEModal = () => {
    setBLEModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 배경 이미지 */}
      <Image source={background} style={styles.backgroundImage} />
      <View style={styles.ttubeotWebviewContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ uri: 'file:///android_asset/renderModel.html' }}
          style={styles.ttubeotWebview}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          onLoadStart={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.log('WebView Start: ', nativeEvent);
          }}
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView onError: ', nativeEvent);
          }}
          onHttpError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView onHttpError: ', nativeEvent);
          }}
          onMessage={event => {
            console.log('Message from WebView:', event.nativeEvent.data);
          }}
        />
      </View>

      {/* 버튼 컨테이너 */}
      {!modalVisible && !missionModalVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={openShopModal}>
            <Image source={ShopIcon} style={styles.shopIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openMissionModal}>
            <Image source={MissionIcon} style={styles.missionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openBLEModal}>
            <Image source={AlbumIcon} style={styles.albumIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openFriendsModal}>
            <Image source={FriendIcon} style={styles.albumIcon} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={openAlbumModal}>
            <Image source={AlbumIcon} style={styles.albumIcon} />
          </TouchableOpacity> */}
        </View>
      )}

      {/* 프로필 컨테이너 */}
      <View style={styles.profileContainer}>
        <TtubeotProfile />
      </View>

      <View style={styles.currencyContainer}>
        <CurrencyDisplay />
      </View>

      {/* 모달 컴포넌트 */}
      <CharacterShopModal
        modalVisible={modalVisible}
        closeShopModal={closeShopModal}
      />

      <MissionModal
        missionModalVisible={missionModalVisible}
        closeMissionModal={closeMissionModal}
      />

      <GraduationAlbumModal
        modalVisible={graduationAlbumModalVisible}
        closeAlbumModal={closeAlbumModal}
      />

      <FriendsModal
        modalVisible={friendsModalVisible}
        closeFriendsModal={closeFriendsModal}
      />
      <BLEModal modalVisible={BLEModalVisible} closeBLEModal={closeBLEModal} />
      {/* WebView로 3D 모델 표시 */}
    </SafeAreaView>
  );
};

export default HomeScreen;