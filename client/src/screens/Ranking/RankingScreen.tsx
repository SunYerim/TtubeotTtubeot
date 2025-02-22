import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, ImageBackground, Text } from 'react-native';
import styles from './RankingScreen.styles';
import StyledText from '../../styles/StyledText';
import RankingScreenButtonContainer from './RankingScreenButtonContainer';
import { dummyRankingList } from './dummyData';
import { getRankingInfo } from '../../utils/apis/Ranking/getRankingInfo';
import { useUser } from '../../store/user';
import { profileColor } from '../../components/ProfileImageUrl';
import { useIsFocused } from '@react-navigation/native';
import Icon from '../../components/Icon';

const IntroTtubeotRabbit = require('../../assets/ttubeot/IntroTtubeotRabbit.png');
const gold = require('../../assets/medals/gold.png');
const silver = require('../../assets/medals/silver.png');
const bronze = require('../../assets/medals/bronze.png');
const backgroundImage = require('../../assets/backgrounds/rankingBackgroundImage.jpg'); // 배경 이미지 경로 설정
const titleImage = require('../../assets/images/rankingTitle.png');

interface RankingProps {
  userId: number;
  username: string;
  score: number;
  ttubeotId: number;
}

const RankingScreen = () => {
  const [rankingList, setRankingList] = useState<RankingProps[]>([]);
  const isFocused = useIsFocused(); // 화면 포커스 여부 감지
  const { user } = useUser.getState();

  useEffect(() => {
    const fetchRankingInfo = async () => {
      const res = (await getRankingInfo()) as unknown as RankingProps[];
      setRankingList(res);
      // 반복문으로 한 줄씩 출력
      // res.forEach((ranking, index) => {
      //   console.log(`Ranking ${index + 1}:`, ranking);
      // });
    };

    if (isFocused) {
      // 화면이 포커스되었을 때만 실행
      fetchRankingInfo();
    }
  }, [isFocused]);

  return (
    <View style={styles.backGround}>
      <View style={styles.topContainer}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
        />
        <Image source={titleImage} style={styles.titleImage} />
        <StyledText bold color="#1f1913e0" style={styles.rankingText}>
          랭킹
        </StyledText>
        <View style={styles.topThreeList}>
          {rankingList[1] && (
            <View style={styles.second}>
              <StyledText bold style={styles.playerName}>
                {rankingList[1].username}
              </StyledText>
              <View
                style={[
                  styles.top3PlayerImageContainer,
                  user.userId === rankingList[1].userId &&
                    styles.highlightedBorder,
                ]}>
                <Image
                  source={profileColor[rankingList[1].ttubeotId]}
                  style={styles.top3PlayerImage}
                />
              </View>
              <Image source={silver} style={styles.medal} />
            </View>
          )}
          {rankingList[0] && (
            <View style={styles.first}>
              <StyledText bold style={styles.playerName}>
                {rankingList[0].username}
              </StyledText>
              <View
                style={[
                  styles.top3PlayerImageContainer,
                  user.userId === rankingList[0].userId &&
                    styles.highlightedBorder,
                ]}>
                <Image
                  source={profileColor[rankingList[0].ttubeotId]}
                  style={styles.top3PlayerImage}
                />
              </View>
              <Image source={gold} style={styles.medal} />
            </View>
          )}
          {rankingList[2] && (
            <View style={styles.third}>
              <StyledText bold style={styles.playerName}>
                {rankingList[2].username}
              </StyledText>
              <View
                style={[
                  styles.top3PlayerImageContainer,
                  user.userId === rankingList[2].userId &&
                    styles.highlightedBorder,
                ]}>
                <Image
                  source={profileColor[rankingList[2].ttubeotId]}
                  style={styles.top3PlayerImage}
                />
              </View>
              <Image source={bronze} style={styles.medal} />
            </View>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.rankingList}
        contentContainerStyle={{ paddingBottom: 120 }}>
        {rankingList.map((ranking, index) => {
          if (index <= 2 || index >= 999) return null;

          // 강조 스타일 적용 조건
          const isHighlighted = user.userId == ranking.userId;

          return (
            <View style={styles.rankingContainer} key={index}>
              <StyledText bold color="#493531" style={styles.ranking}>
                {(index + 1).toString().padStart(2, '0')}
              </StyledText>
              <View
                style={[
                  isHighlighted ? styles.isMerankingInfo : styles.rankingInfo,
                ]}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={profileColor[ranking.ttubeotId] || profileColor[1]}
                    style={styles.playerImage}
                  />
                </View>
                <View style={styles.nameAndScore}>
                  <StyledText bold style={styles.rankingName}>
                    {ranking.username}
                  </StyledText>
                  <View
                    style={[
                      styles.scoreContainer,
                      ranking.score >= 1000 ? { fontSize: 14 } : null,
                    ]}>
                    <StyledText bold style={styles.rankingScore}>
                      {ranking.score.toLocaleString()}
                    </StyledText>
                    <Icon
                      type="FontAwesome5"
                      name="paw"
                      size={20}
                      color="#70615E"
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RankingScreen;
