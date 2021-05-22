import React, { memo } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 385,
    position: 'relative',
  },
  media: {
    height: 100,
    backgroundColor: '#3f51b5',
  },
});
const ParentNameArea = styled(Typography)`
  font-size: 25px;
`;
const ProfileImageBox = styled(Box)`
  position: absolute;
  top: 20px;
`;
const MyCardActions = styled(CardActions)`
  display: flex;
`;

const MyCardActionArea = styled(Box)`
  height: 340px;
`;

const ButtonWrapper = styled(Box)`
  width: 100px;
  margin: 0 0 0 auto;
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
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <MyCardActionArea>
        <CardMedia className={classes.media} title="Contemplative Reptile" />
        <CardContent>
          <Box display="flex" justifyContent="center">
            <ProfileImageBox>
              <ProfileImage />
            </ProfileImageBox>
          </Box>
          <Box mt={5}>
            <ParentNameArea variant="subtitle1" color="inherit" align="center">
              {lastName}
              {firstName}
            </ParentNameArea>
          </Box>
          <Box mb={2}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              component="h3"
              align="center"
            >
              {gender === 0 ? 'お母さん' : 'お父さん'}
            </Typography>
          </Box>
          <Box mt={1} display="flex" justifyContent="center">
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
          </Box>
          <Box mt={1} display="flex" justifyContent="center">
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
          </Box>
        </CardContent>
      </MyCardActionArea>
      <MyCardActions>
        <ButtonWrapper>
          <Button size="small" color="primary">
            Update
          </Button>
        </ButtonWrapper>
      </MyCardActions>
    </Card>
  );
});

ParentProfile.displayName = 'ParentProfile';
