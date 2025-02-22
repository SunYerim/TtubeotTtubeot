import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ButtonDefault from '../../components/Button/ButtonDefault';
import styled from 'styled-components/native';
import styles from './RankingScreen.styles';

const ButtonContainer = styled.View`
  width: 100%;
  height: 10%;
  margin-vertical: 1%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  gap: 40px;
`;

const RankingScreenButtonContainer = () => {
  return (
    <ButtonContainer>
      {/* <TouchableOpacity onPress={() => console.log('뚜벗 랭킹 클릭')}>
        <ButtonDefault
          content="뚜벗 랭킹"
          width={120}
          height={60}
          borderRadius={30}
        />
      </TouchableOpacity> */}
      <Text style={styles.rankingText}>랭킹</Text>
    </ButtonContainer>
  );
};

export default RankingScreenButtonContainer;
