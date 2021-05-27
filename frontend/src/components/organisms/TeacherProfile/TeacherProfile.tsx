import React, { memo, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../../providers/UserProvider';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 560,
    minHeight: 300,
    position: 'relative',
    borderRadius: 20,
  },
  media: {
    height: 100,
    backgroundColor: '#3f51b5',
  },
});

const ButtonWrapper = styled(Box)`
  width: 100px;
  margin: 0 0 0 auto;
`;

const KidNameArea = styled(Typography)`
  font-size: 25px;
`;

const MyCardActions = styled(CardActions)`
  display: flex;
`;

const MyCardActionArea = styled(Box)`
  min-height: 300px;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  // onerror: 'this.src= ' ${process.env.PUBLIC_URL} / noimage.jpeg '';
`;

const ProfileImageBox = styled(Box)`
  position: absolute;
  top: 20px;
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

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <MyCardActionArea>
        <CardMedia className={classes.media} />
        <CardContent>
          <Box display="flex" justifyContent="center">
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
          </Box>
          <Box mt={9} mb={1}>
            <KidNameArea variant="h4" color="inherit" align="center">
              {lastName}
              {firstName}
            </KidNameArea>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box>
              <Typography
                variant="h6"
                color="textSecondary"
                component="h6"
                align="center"
              >
                {daycareName}
              </Typography>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textPrimary" component="h2">
              {currentUser.selfIntroduction
                ? selfIntroduction
                : '自己紹介が未登録です'}
            </Typography>
          </Box>
        </CardContent>
      </MyCardActionArea>
      {String(currentUser.id) == teacherId ? (
        <MyCardActions>
          <ButtonWrapper>
            <Button size="small" color="primary" onClick={onClick}>
              Update
            </Button>
          </ButtonWrapper>
        </MyCardActions>
      ) : (
        <div></div>
      )}
    </Card>
  );
});

TeacherProfile.displayName = 'TeacherProfile';
