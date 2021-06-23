import React, { memo, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../../providers/UserProvider';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { StyledButton } from '../../atoms';

const ButtonWrapper = styled(Box)`
  width: 250px;
  margin: 0 0 0 auto;
  display: flex;
  justify-content: center;
`;

const BackgroundImage = styled(Box)`
  background: radial-gradient(#ff9463, #f25e5d);
`;

const Daycare = styled(Box)`
  color: white;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const FirstName = styled(Typography)`
  font-size: 25px;
  color: white;
  margin-left: 10px;
`;

const LastName = styled(Typography)`
  font-size: 25px;
  margin-right: 10px;
  color: white;
`;

const MyCard = styled(Card)`
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 6px;
`;

const MyCardMedia = styled(CardMedia)`
  height: 180px;
`;

const MyCardActionArea = styled(Box)`
  height: 440px;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileImageBox = styled(Box)`
  position: absolute;
  top: 20px;
`;

const ProfileImageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

const SelfIntroduction = styled(Box)`
  padding: 3% 10%;
`;

const TeacherName = styled(Typography)`
  margin-top: 10px;
  height: 50px;
  font: white;
  display: flex;
  justify-content: center;
`;

export type Props = {
  daycareName: string;
  firstName: string;
  lastName: string;
  selfIntroduction: string | null;
  onClick?: () => void;
};

export const TeacherProfile: React.FC<Props> = memo((props) => {
  const { firstName, daycareName, lastName, selfIntroduction, onClick } = props;

  const { currentUser } = useContext(CurrentUserContext);

  const { teacherId } = useParams<{ teacherId: string }>();

  return (
    <MyCard elevation={6}>
      <MyCardActionArea>
        <BackgroundImage>
          <MyCardMedia />
          <Box display="flex" justifyContent="center">
            <ProfileImageWrapper>
              <ProfileImageBox>
                <ProfileImage
                  src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/user/image/${teacherId}/image.jpeg`}
                  alt=""
                  onError={(e) =>
                    (e.currentTarget.src =
                      'https://d2hmx91pr90hgc.cloudfront.net/noimage.jpeg')
                  }
                />
              </ProfileImageBox>
            </ProfileImageWrapper>
          </Box>
          <TeacherName>
            <LastName variant="subtitle1" align="center">
              {lastName}
            </LastName>
            <FirstName variant="subtitle1" align="center">
              {firstName}
            </FirstName>
          </TeacherName>
          <Daycare>
            <Box>
              <Typography variant="h6" component="h6" align="center">
                {daycareName}
              </Typography>
            </Box>
          </Daycare>
        </BackgroundImage>
        <SelfIntroduction>
          <Typography variant="subtitle1" color="textPrimary" component="h2">
            {currentUser.selfIntroduction
              ? selfIntroduction
              : '自己紹介が未登録です'}
          </Typography>
        </SelfIntroduction>
      </MyCardActionArea>
      {String(currentUser.id) == teacherId ? (
        <ButtonWrapper>
          <StyledButton
            onClick={onClick}
            label="Update"
            fontSize={15}
            width={60}
            borderRadius={20}
          />
        </ButtonWrapper>
      ) : (
        <div></div>
      )}
    </MyCard>
  );
});

TeacherProfile.displayName = 'TeacherProfile';
