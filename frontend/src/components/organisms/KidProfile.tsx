import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ProfileImage } from '../atoms/ProfileImage';
import styled from 'styled-components';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 440,
    position: 'relative',
  },
  media: {
    height: 100,
    backgroundColor: '#3f51b5',
  },
});
const KidNameArea = styled(Typography)`
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
  height: 390px;
`;

const ButtonWrapper = styled(Box)`
  width: 100px;
  margin: 0 0 0 auto;
`;

export type Props = {
  age: number | null;
  kidName: string | null;
  favoritePlay: string | null;
  favoriteFood: string | null;
};

export const KidProfile: React.FC<Props> = (props) => {
  const { age, kidName, favoriteFood, favoritePlay } = props;
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
            <KidNameArea variant="subtitle1" color="inherit" align="center">
              {kidName}
            </KidNameArea>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box mr={2}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="h2"
                align="center"
              >
                {age}
              </Typography>
            </Box>
            <Box ml={2}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="h2"
                align="center"
              >
                {age}才
              </Typography>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" color="inherit" component="h2">
              好きな遊び
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="h1"
              align="center"
            >
              {favoritePlay}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" color="inherit" component="h2">
              好きな食べ物
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="h1"
              align="center"
            >
              {favoriteFood}
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
};
