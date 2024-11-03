import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './AdventureScreen.styles';
import TtubeotProfile from '../../components/TtubeotProfile';
import CurrencyDisplay from '../../components/CurrencyDisplay';
import AdventureMapScreen from '../../components/Adventure/AdventureMapScreen';
import ButtonDefault from '../../components/Button/ButtonDefault';
import AdventureAlert from '../../components/Adventure/AdventureAlert';
import GPSAlertModal from '../../components/Adventure/GPSAlertModal';
import CameraModal from '../../components/ARComponents/CameraModal';
import MissionModal from '../../components/Mission/MissionModal';

const background = require('../../assets/images/AdventureBackground.jpg');
const CameraIcon = require('../../assets/icons/CameraIcon.png');
const MissionIcon = require('../../assets/icons/MissionIcon.png');
const MapIcon = require('../../assets/icons/MapIcon.png');

const isRunningOnEmulator = () => {
  if (Platform.OS === 'android') {
    const brand = Platform.constants?.Brand || '';
    const model = Platform.constants?.Model || '';
    console.log(brand, model);
    return brand.includes('generic') || model.includes('Emulator');
  }
  return false;
};

const AdventureScreen = () => {
  const [adventureStart, setAdventureStart] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [missionVisible, setMissionVisible] = useState<boolean>(false);
  const opacityAnim = useRef(new Animated.Value(0.65)).current;

  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isARMode, setIsARMode] = useState<boolean>(false);
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    isRunningOnEmulator();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    };
    requestPermissions();
  }, [hasPermission]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAdventureStart(!adventureStart);
    setTimeout(() => {
      Animated.timing(opacityAnim, {
        toValue: adventureStart ? 0.65 : 0.3,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 100);
  };

  const handleStartAdventure = () => {
    if (!adventureStart) {
      openModal();
    } else {
      closeModal();
    }
  };

  const handlePressArButton = async () => {
    if (hasPermission) {
      setIsARMode(true);
      setIsCameraOpen(true);
    } else {
      await requestPermission();
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    setIsARMode(false);
  };

  const handlePressMissionModal = () => {
    setMissionVisible(true);
  };

  const handleCloseMissionModal = () => {
    setMissionVisible(false);
  };

  const renderPage = () => {
    if (adventureStart) {
      return <AdventureMapScreen />;
    } else {
      return <AdventureAlert />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={background}
        style={[styles.backgroundImage, { opacity: opacityAnim }]}
      />
      <View style={styles.profileContainer}>
        <TtubeotProfile />
      </View>
      <View style={styles.currencyContainer}>
        <CurrencyDisplay />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePressArButton}>
          <Image source={CameraIcon} style={styles.cameraIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressMissionModal}>
          <Image source={MissionIcon} style={styles.missionIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{renderPage()}</View>
      <View style={styles.startButtonContainer}>
        <TouchableOpacity onPress={handleStartAdventure}>
          <ButtonDefault
            content={adventureStart ? 'STOP' : 'START'}
            iconSource={MapIcon}
            height={60}
            width={140}
            fontSize={20}
          />
        </TouchableOpacity>
      </View>
      <GPSAlertModal modalVisible={modalVisible} closeModal={closeModal} />

      {/* <CameraModal
        modalVisible={isCameraOpen}
        closeModal={handleCloseCamera}
        isARMode={isARMode}
      /> */}

      <MissionModal
        missionModalVisible={missionVisible}
        closeMissionModal={handleCloseMissionModal}
      />
    </SafeAreaView>
  );
};

export default AdventureScreen;
