import React, { memo } from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { StyledButton } from '../../atoms';

const AgeAndGender = styled(Box)`
  color: white;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const BackgroundImage = styled(Box)`
  background: radial-gradient(#ff9463, #f25e5d);
`;

const ButtonWrapper = styled(Box)`
  width: 250px;
  margin: 0 0 0 auto;
  display: flex;
  justify-content: center;
`;

const Content = styled(Box)`
  padding: 3% 10%;
`;

const FavoriteFood = styled(Typography)`
  color: white;
  padding: 0.5em;
  display: inline-block;
  line-height: 1.3;
  background: #f25e5d;
  vertical-align: middle;
  border-radius: 25px 0px 0px 25px;
  &::before {
    content: '●';
    color: white;
    margin-right: 8px;
  }
`;

const FavoritePlay = styled(Typography)`
  color: white;
  padding: 0.5em;
  display: inline-block;
  line-height: 1.3;
  background: #f25e5d;
  vertical-align: middle;
  border-radius: 25px 0px 0px 25px;
  &::before {
    content: '●';
    color: white;
    margin-right: 8px;
  }
`;

const FirstName = styled(Typography)`
  font-size: 25px;
  color: white;
  margin-left: 10px;
`;

const KidName = styled(Typography)`
  margin-top: 10px;
  height: 50px;
  font: white;
  display: flex;
  justify-content: center;
`;

const MyCard = styled(Card)`
  width: 580px;
  height: 580px;
  position: relative;
  border-radius: 2px;
`;

const MyCardMedia = styled(CardMedia)`
  height: 180px;
`;

const MyCardActionArea = styled(Box)`
  height: 390px;
`;

const LastName = styled(Typography)`
  font-size: 25px;
  margin-right: 10px;
  color: white;
`;

const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 70%;
`;

const ProfileImageBox = styled(Box)`
  top: 40px;
  position: absolute;
`;

const ProfileImageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

export type Props = {
  age: number | null;
  kidId: string | null;
  gender: number;
  lastName: string | null;
  firstName: string | null;
  favoritePlay: string | null;
  favoriteFood: string | null;
  onClick: () => void;
};

export const KidProfile: React.FC<Props> = memo((props) => {
  const {
    age,
    kidId,
    gender,
    lastName,
    firstName,
    favoriteFood,
    favoritePlay,
    onClick,
  } = props;

  return (
    <MyCard elevation={6}>
      <MyCardActionArea>
        <BackgroundImage>
          <MyCardMedia />
          <ProfileImageWrapper>
            <ProfileImageBox>
              <ProfileImage
                src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/kid/image/${kidId}/image.jpeg`}
                alt=""
                onError={(e) =>
                  (e.currentTarget.src =
                    'https://d2hmx91pr90hgc.cloudfront.net/noimage.jpeg')
                }
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
        </BackgroundImage>
        <Content>
          <Box mt={2}>
            <FavoritePlay variant="subtitle1" color="inherit">
              好きな遊び
            </FavoritePlay>
          </Box>
          <Box mt={1}>
            <Typography variant="h6" component="h6" align="center">
              {favoritePlay}
            </Typography>
          </Box>
          <Box mt={2}>
            <FavoriteFood variant="subtitle1" color="textPrimary">
              好きな食べ物
            </FavoriteFood>
          </Box>
          <Box mt={1}>
            <Typography variant="h6" component="h6" align="center">
              {favoriteFood}
            </Typography>
          </Box>
        </Content>
        <ButtonWrapper>
          <StyledButton
            variant="contained"
            onClick={onClick}
            label="Update"
            fontSize={15}
            width={60}
            borderRadius={20}
          />
        </ButtonWrapper>
      </MyCardActionArea>
    </MyCard>
  );
});

KidProfile.displayName = 'KidProfile';
