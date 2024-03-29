import React, { memo } from 'react';
import styled from 'styled-components';

import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import MailIcon from '@material-ui/icons/Mail';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import { StyledButton } from '../../atoms';

const BackgroundImage = styled(Box)`
  background: radial-gradient(#ff9463, #f25e5d);
`;

const ButtonWrapper = styled(Box)`
  width: 160px;
  margin: 0 0 0 auto;
  display: flex;
  justify-content: center;
`;

const Email = styled(Box)`
  margin: 15px 0 0 0;
  display: flex;
  justify-content: center;
`;

const FirstName = styled(Typography)`
  font-size: 25px;
  color: white;
  margin-left: 10px;
`;

const Gender = styled(Box)`
  color: white;
  height: 50px;
`;

const MyCard = styled(Card)`
  width: 345px;
  height: 450px;
  position: relative;
`;

const MyCardActions = styled(CardActions)`
  display: flex;
`;

const MyCardActionArea = styled(Box)`
  height: 390px;
`;

const MyCardMedia = styled(CardMedia)`
  height: 140px;
`;
const LastName = styled(Typography)`
  font-size: 25px;
  margin-right: 10px;
  color: white;
`;

const ParentName = styled(Typography)`
  font-size: 25px;
  margin-top: 10px;
  height: 50px;
  font: white;
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 35%;
`;

const ProfileImageBox = styled(Box)``;

const ProfileImageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

const TelephoneNumber = styled(Box)`
  margin: 25px 0 15px;
  display: flex;
  justify-content: center;
`;

export type Props = {
  onClick: () => void;
  id: number;
  email: string | null;
  gender: number | null;
  lastName: string | null;
  firstName: string | null;
  telephoneNumber: string | null;
};

export const ParentProfile: React.FC<Props> = memo((props) => {
  const { id, firstName, lastName, telephoneNumber, email, gender, onClick } =
    props;

  return (
    <MyCard elevation={6}>
      <MyCardActionArea>
        <BackgroundImage>
          <MyCardMedia />
          <ProfileImageWrapper>
            <ProfileImageBox>
              <ProfileImage
                src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/user/image/${id}/image.jpeg`}
                alt=""
                onError={(e) =>
                  (e.currentTarget.src =
                    'https://d2hmx91pr90hgc.cloudfront.net/noimage.jpeg')
                }
              />
            </ProfileImageBox>
          </ProfileImageWrapper>
          <ParentName>
            <LastName variant="subtitle1" align="center">
              {lastName}
            </LastName>
            <FirstName variant="subtitle1" align="center">
              {firstName}
            </FirstName>
          </ParentName>
          <Gender>
            <Typography
              variant="subtitle2"
              color="inherit"
              component="h3"
              align="center"
            >
              {gender === 0 ? 'お母さん' : 'お父さん'}
            </Typography>
          </Gender>
        </BackgroundImage>
        <TelephoneNumber>
          <Box mr={4} mb={2}>
            <PhoneIcon />
          </Box>
          <Typography
            variant="h6"
            color="textSecondary"
            component="h6"
            align="center"
          >
            {telephoneNumber}
          </Typography>
        </TelephoneNumber>
        <Email>
          <Box mr={4}>
            <MailIcon />
          </Box>
          <Typography
            variant="h6"
            color="textSecondary"
            component="h6"
            align="center"
          >
            {email}
          </Typography>
        </Email>
      </MyCardActionArea>
      <MyCardActions>
        <ButtonWrapper>
          <StyledButton
            variant="contained"
            onClick={onClick}
            label="Update"
            fontSize={15}
            width={80}
            borderRadius={20}
          ></StyledButton>
        </ButtonWrapper>
      </MyCardActions>
    </MyCard>
  );
});

ParentProfile.displayName = 'ParentProfile';
