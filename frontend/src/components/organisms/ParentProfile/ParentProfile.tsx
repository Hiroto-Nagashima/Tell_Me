import React, { memo } from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import { Box } from '@material-ui/core';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';
import { StyledButton } from '../../atoms';

const BackgroundImage = styled(Box)`
  background: radial-gradient(#ff9463, #f25e5d);
`;
const FirstName = styled(Typography)`
  font-size: 25px;
  color: white;
  margin-left: 10px;
`;

const Email = styled(Box)`
  margin: 15px 0;
  display: flex;
  justify-content: center;
`;

const Gender = styled(Box)`
  color: white;
  height: 50px;
`;
const ParentName = styled(Typography)`
  font-size: 25px;
  margin-top: 10px;
  height: 50px;
  font: white;
  display: flex;
  justify-content: center;
`;

const ProfileImageBox = styled(Box)`
  position: absolute;
  top: 100px;
`;

const MyCard = styled(Card)`
  width: 345px;
  height: 450px;
  position: 'relative';
`;

const MyCardActions = styled(CardActions)`
  display: flex;
`;

const MyCardActionArea = styled(Box)`
  height: 400px;
`;

const MyCardMedia = styled(CardMedia)`
  height: 140px;
`;
const LastName = styled(Typography)`
  font-size: 25px;
  margin-right: 10px;
  color: white;
`;
const ButtonWrapper = styled(Box)`
  width: 100px;
  margin: 0 0 0 auto;
`;
const FlexBox = styled(Box)`
  display: flex;
  justify-content: center;
`;
const TelephoneNumber = styled(Box)`
  margin: 25px 0 15px;
  display: flex;
  justify-content: center;
`;

export type Props = {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  gender: number | null | undefined;
  email: string | null | undefined;
  telephoneNumber: string | null | undefined;
};

export const ParentProfile: React.FC<Props> = memo((props) => {
  const { firstName, lastName, telephoneNumber, email, gender } = props;

  return (
    <MyCard>
      <MyCardActionArea>
        <BackgroundImage>
          <MyCardMedia />
          <FlexBox>
            <ProfileImageBox>
              <ProfileImage />
            </ProfileImageBox>
          </FlexBox>
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
          <StyledButton label="Update"></StyledButton>
        </ButtonWrapper>
      </MyCardActions>
    </MyCard>
  );
});

ParentProfile.displayName = 'ParentProfile';
