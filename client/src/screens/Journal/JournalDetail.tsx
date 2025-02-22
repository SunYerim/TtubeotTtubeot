import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  Animated,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import StyledText from '../../styles/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import styles from './JournalDetail.styles';
import ButtonFlat from '../../components/Button/ButtonFlat';
import AdventureRoute from '../../components/Journal/AdventureRoute';
import { JournalData, JournalDetailData } from '../../types/JournalData';
import { getJournalDetail } from '../../utils/apis/Journal/Journal';
import { useUser } from '../../store/user';
import { profileColor } from '../../components/ProfileImageUrl';
import PictureModal from './PictureModal';
import { getPostposition } from '../../utils/libs/postPosition';

type JournalDetailProps = {
  journal: JournalData;
  closeJournalDetail: () => void;
};

const flipIcon = require('../../assets/icons/FlipIcon.png');
const flipFrontIcon = require('../../assets/icons/FlipFrontIcon.png');
const flipBackIcon = require('../../assets/icons/FlipBackIcon.png');
const noPicture = require('../../assets/images/JournalImageNotCreated.png');
const ttubeot = require('../../assets/images/TtubeotTitleKR.png');
const fullScreen = require('../../assets/icons/fullScreen.png');

const JournalDetail = ({ journal, closeJournalDetail }: JournalDetailProps) => {
  const { accessToken, setAccessToken } = useUser.getState();
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const colorAnimation = useRef(new Animated.Value(0)).current;
  const [isFrontView, setIsFrontView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journalDetail, setJournalDetail] = useState<JournalDetailData | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      await loadJournalDetail();
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const listenerId = flipAnimation.addListener(({ value }) => {
      if (value >= 0.5 && isFrontView) {
        setIsFrontView(false);
      } else if (value < 0.5 && !isFrontView) {
        setIsFrontView(true);
      }
    });

    return () => {
      flipAnimation.removeListener(listenerId);
    };
  }, [isFrontView, flipAnimation]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
      { iterations: 3 },
    ).start();
  }, [colorAnimation]);

  const loadJournalDetail = async () => {
    try {
      const res = await getJournalDetail(
        journal.adventure_log_id,
        accessToken,
        setAccessToken,
      );
      if (res) {
        setJournalDetail(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const animatedColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#7A7A7A', '#303030'],
  });

  const flipContainer = () => {
    Animated.timing(flipAnimation, {
      toValue: isFrontView ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.9, 1],
    outputRange: [1, 0.9, 0],
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 0.9, 1],
  });

  const shadowOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [1, 0, 0, 1],
  });

  const frontRotateY = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const backRotateY = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const openRouteModal = () => {
    setIsModalOpen(true);
  };

  const closeRouteModal = () => {
    setIsModalOpen(false);
  };

  const [pictureModalOpen, setPictureModalOpen] = useState<boolean>(false);

  const openPictureModal = () => {
    setPictureModalOpen(true);
  };

  const closePictureModal = () => {
    setPictureModalOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundCircle} />
      <TouchableOpacity onPress={flipContainer}>
        <Animated.View
          style={[styles.flipContainer, { backgroundColor: animatedColor }]}>
          <Image
            style={styles.flipButton}
            source={isFrontView ? flipFrontIcon : flipBackIcon}
          />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.shadow, { opacity: shadowOpacity }]} />
      {isFrontView ? (
        <Animated.View
          style={[
            styles.outerContainer,
            { opacity: frontOpacity, transform: [{ rotateY: frontRotateY }] },
          ]}>
          <View style={styles.frontView}>
            <View style={styles.titleContainer}>
              <Image
                source={ttubeot}
                style={styles.title}
                resizeMode="contain"
              />
            </View>
            <View style={styles.pictureContainer}>
              {journalDetail?.image_urls && (
                <TouchableOpacity
                  style={{ width: '100%', height: '100%' }}
                  onPress={openPictureModal}>
                  <Image
                    source={{ uri: journalDetail.image_urls[0] }}
                    style={styles.picture}
                  />
                  <View style={styles.fullScreenButton}>
                    <View style={styles.fullScreenButtonBackground} />
                    <Image source={fullScreen} style={styles.fullScreenIcon} />
                  </View>
                </TouchableOpacity>
              )}
              <View style={styles.pictureFooter}>
                <View style={styles.withTtubeotContainer}>
                  <Image
                    source={profileColor[journal.ttubeot_id]}
                    style={styles.withTtubeot}
                  />
                </View>
                <View style={styles.footerText}>
                  <StyledText bold>
                    {getPostposition(journal.ttubeot_name)} 함께한{' '}
                    {journalDetail?.start_at}일의 모험 기록
                  </StyledText>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.outerContainer,
            { opacity: backOpacity, transform: [{ rotateY: backRotateY }] },
          ]}>
          <View style={styles.backView}>
            <View style={styles.journalTitleContainer}>
              <StyledText bold style={styles.journalTitle}>
                {journal.ttubeot_name}
                <StyledText>
                  {getPostposition(journal.ttubeot_name)} 함께한
                </StyledText>
              </StyledText>
              <StyledText bold style={styles.journalTitle}>
                {journalDetail.start_at}
                <StyledText>의 발자국</StyledText>
              </StyledText>
            </View>
            <View style={styles.journalContentContainer}>
              <View style={styles.journalDetailSection}>
                <Icon type="Ionicons" name="time" size={25} color="#A5C168" />
                <StyledText style={styles.journalDetail}>
                  총 모험 시간
                </StyledText>
                <StyledText style={styles.journalDetail}>
                  {journalDetail.duration} 분
                </StyledText>
              </View>
              <View style={styles.journalDetailSection}>
                <Icon
                  type="FontAwesome5"
                  name="paw"
                  size={25}
                  color="#A5C168"
                />
                <StyledText style={styles.journalDetail}>
                  {journalDetail.adventure_steps} 걸음
                </StyledText>
                <StyledText style={styles.journalDetail}>
                  약 {journalDetail.adventure_calorie} kcal
                </StyledText>
              </View>
              <View style={styles.journalDetailSection}>
                <Icon
                  type="FontAwesome5"
                  name="user-friends"
                  size={25}
                  color="#A5C168"
                />
                <StyledText style={styles.journalDetail}>
                  획득한 보물
                </StyledText>
                <StyledText style={styles.journalDetail}>
                  {journalDetail.adventure_coin}
                </StyledText>
              </View>
              <View style={styles.journalDetailSection}>
                <Icon
                  type="FontAwesome5"
                  name="route"
                  size={25}
                  color="#A5C168"
                />
                <StyledText style={styles.journalDetail}>
                  모험 경로 확인
                </StyledText>
                {journalDetail?.gps_log &&
                journalDetail.gps_log.length > 0 &&
                journalDetail.adventure_distance >= 3 &&
                journalDetail.adventure_steps >= 30 &&
                journalDetail.duration >= 1 ? (
                  <Pressable onPress={openRouteModal}>
                    <StyledText color="#7C92B3" style={styles.journalDetailMap}>
                      확인하기
                    </StyledText>
                  </Pressable>
                ) : (
                  <StyledText style={styles.journalDetail}>
                    모험 경로가 없어요!
                  </StyledText>
                )}
              </View>
            </View>
          </View>
        </Animated.View>
      )}
      <TouchableOpacity style={styles.backButton} onPress={closeJournalDetail}>
        <ButtonFlat content="돌아가기" />
      </TouchableOpacity>

      {!loading && (
        <AdventureRoute
          modalVisible={isModalOpen}
          closeModal={closeRouteModal}
          gpsLog={journalDetail.gps_log}
        />
      )}
      {journalDetail?.image_urls && journalDetail.image_urls.length > 0 && (
        <PictureModal
          modalVisible={pictureModalOpen}
          picture={journalDetail.image_urls[0]}
          closeModal={closePictureModal}
        />
      )}
    </SafeAreaView>
  );
};

export default JournalDetail;
