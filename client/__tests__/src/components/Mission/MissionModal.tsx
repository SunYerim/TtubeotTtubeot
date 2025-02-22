import React, { useState } from 'react';
import { View, Modal, ScrollView, Image, TouchableOpacity } from 'react-native';
import styles from './MissionModal.styles';
import StyledText from '../../styles/StyledText';
import Icon from 'react-native-vector-icons/AntDesign';

const CharacterShopTitleContainer = require('../../assets/images/CharacterShopTitleContainer.png');
const CharacterShopBackgound = require('../../assets/images/CharacterShopBackground.png');
const CoinIcon = require('../../assets/icons/coinIcon.png');

interface CharacterShopModalProps {
  missionModalVisible: boolean;
  closeMissionModal: () => void;
}

interface MissionProps {
  name: string;
  source: any;
  description: string;
  cur: number;
  goal: number;
  isCompleted: boolean;
}

const MissionModal: React.FC<CharacterShopModalProps> = ({
  missionModalVisible,
  closeMissionModal,
}) => {
  const [selectedMenu, setSelectedMenu] = useState<string>('일일 미션');
  const missionList: string[] = ['일일 미션', '주간 미션', '업적'];
  const dailyMissionList: MissionProps[] = [
    {
      name: '뚜벗 쓰다듬기',
      source: require('../../assets/images/RandomCharacter.png'),
      description: '자신의 뚜벗과 상호작용을 해보세요!',
      cur: 1000,
      goal: 2000,
      isCompleted: false,
    },
    {
      name: '친구와 인사 나누기',
      source: require('../../assets/images/RandomCharacter.png'),
      description: '주변 친구들과 인사를 나눠보세요!',
      cur: 1,
      goal: 2,
      isCompleted: false,
    },
  ];

  const weeklyMissionList: MissionProps[] = [];
  const achievementList: MissionProps[] = [];

  const completeMission = () => {
    console.log('complete mission');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={missionModalVisible}
      onRequestClose={closeMissionModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <View style={styles.titleBackContainer}>
            <Image
              source={CharacterShopBackgound}
              style={styles.titleBackImage}
            />
          </View>
          <View style={styles.titleContainer}>
            <Image
              source={CharacterShopTitleContainer}
              style={styles.titleImage}
            />
            <StyledText bold style={styles.title}>
              미션
            </StyledText>
            <Icon
              name="close"
              size={30}
              color="black"
              style={styles.closeButton}
              onPress={() => {
                closeMissionModal();
                setSelectedMenu('일일 미션');
              }}
            />
          </View>

          <View style={styles.menuContainer}>
            {missionList.map((mission, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedMenu(mission)}>
                <View
                  style={
                    selectedMenu === mission
                      ? [styles.menu, styles.selectedMenu]
                      : styles.menu
                  }>
                  <View style={styles.stitchedBorder}></View>
                  <StyledText bold style={styles.menuText}>
                    {mission}
                  </StyledText>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.itemContainer}>
            {selectedMenu === '일일 미션' &&
              dailyMissionList.map((item, index) => {
                return (
                  <View style={styles.item} key={index}>
                    <View style={styles.itemImageContainer}>
                      <Image source={item.source} style={styles.itemImage} />
                    </View>
                    <View style={styles.itemInfoContainer}>
                      <StyledText bold style={styles.itemName}>
                        {item.name}
                      </StyledText>
                      <StyledText bold>{item.description}</StyledText>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MissionModal;
