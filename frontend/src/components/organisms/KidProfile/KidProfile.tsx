import React, { memo } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { FlexibleButton } from '../../atoms';

const MyCard = styled(Card)`
  width: 580px;
  height: 540px;
  position: relative;
  border-radius: 2px;
`;

const MyCardMedia = styled(CardMedia)`
  height: 180px;
  background-color: #f25e5d;
`;

const KidName = styled(Typography)`
  height: 50px;
  background-color: #f25e5d;
  font: white;
  display: flex;
  justify-content: center;
`;

const LastName = styled(Typography)`
  font-size: 25px;
  margin-right: 20px;
  color: white;
`;

const FirstName = styled(Typography)`
  font-size: 25px;
  color: white;
`;

const AgeAndGender = styled(Box)`
  color: white;
  height: 50px;
  display: flex;
  background-color: #f25e5d;
  justify-content: center;
`;

const Content = styled(Box)`
  padding: 3% 10%;
`;

const ProfileImageBox = styled(Box)`
  position: absolute;
  top: 40px;
`;

const MyCardActionArea = styled(Box)`
  height: 390px;
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 35%;
  // onerror: 'this.src= ' ${process.env.PUBLIC_URL} / noimage.jpeg '';
`;

const ProfileImageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled(Box)`
  width: 250px;
  margin: 0 0 0 auto;
`;

const FavoritePlay = styled(Typography)`
  background: linear-gradient(transparent 70%, #e4e3e1 70%);
  width: 26%;
`;

const FavoriteFood = styled(Typography)`
  background: linear-gradient(transparent 70%, #e4e3e1 70%);
  width: 31%;
`;

export type Props = {
  age: number | null | undefined;
  kidId: string | null;
  gender: number | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  favoritePlay: string | null | undefined;
  favoriteFood: string | null | undefined;
  onClick: () => void;
};

export const KidProfile: React.FC<Props> = memo((props) => {
  const {
    firstName,
    age,
    kidId,
    gender,
    lastName,
    favoriteFood,
    favoritePlay,
    onClick,
  } = props;

  return (
    <MyCard>
      <MyCardActionArea>
        <MyCardMedia />
        <ProfileImageWrapper>
          <ProfileImageBox>
            <ProfileImage
              src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/kid/image/${kidId}/image.jpeg`}
              alt=""
            />
          </ProfileImageBox>
        </ProfileImageWrapper>
        <KidName>
          <LastName variant="subtitle1" align="center">
            {lastName}
          </LastName>
          <FirstName variant="subtitle1" align="center">
            {firstName}
          </FirstName>
        </KidName>
        <AgeAndGender>
          <Box mr={2}>
            <Typography
              variant="h6"
              color="inherit"
              component="h3"
              align="center"
            >
              {gender === 0 ? '女の子' : '男の子'}
            </Typography>
          </Box>
          <Box ml={2}>
            <Typography
              variant="h6"
              color="inherit"
              component="h3"
              align="center"
            >
              {age}才
            </Typography>
          </Box>
        </AgeAndGender>
        <Content>
          <Box mt={2}>
            <FavoritePlay variant="subtitle1" color="inherit">
              好きな遊び
            </FavoritePlay>
          </Box>
          <Box mt={1}>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h6"
              align="center"
            >
              {favoritePlay}
            </Typography>
          </Box>
          <Box mt={2}>
            <FavoriteFood variant="subtitle1" color="textPrimary">
              好きな食べ物
            </FavoriteFood>
          </Box>
          <Box mt={1}>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h6"
              align="center"
            >
              {favoriteFood}
            </Typography>
          </Box>
        </Content>
        <ButtonWrapper>
          <FlexibleButton
            variant="contained"
            onClick={onClick}
            label="Update"
          />
        </ButtonWrapper>
      </MyCardActionArea>
    </MyCard>
  );
});

KidProfile.displayName = 'KidProfile';
