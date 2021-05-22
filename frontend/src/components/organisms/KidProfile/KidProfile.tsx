import React, { memo } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    width: 345,
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
  age: number | null | undefined;
  src: string | undefined;
  kidId: string | null;
  onClick: () => void;
  gender: number | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  favoritePlay: string | null | undefined;
  favoriteFood: string | null | undefined;
};

export const KidProfile: React.FC<Props> = memo((props) => {
  const {
    firstName,
    src,
    kidId,
    lastName,
    favoriteFood,
    favoritePlay,
    onClick,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <MyCardActionArea>
        <CardMedia className={classes.media} title="Contemplative Reptile" />
        <CardContent>
          <Box display="flex" justifyContent="center">
            <ProfileImageBox>
              <img
                src={`https://d2hmx91pr90hgc.cloudfront.net/uploads/kid/image/${kidId}/${src}`}
                alt=""
              />
            </ProfileImageBox>
          </Box>
          <Box mt={5}>
            <KidNameArea variant="subtitle1" color="inherit" align="center">
              {lastName}
              {firstName}
            </KidNameArea>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box mr={2}>
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
              <Typography
                variant="subtitle1"
                color="textPrimary"
                component="h2"
              >
                好きな食べ物
              </Typography>
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
          </Box>
        </CardContent>
      </MyCardActionArea>
      <MyCardActions>
        <ButtonWrapper>
          <Button size="small" color="primary" onClick={onClick}>
            Update
          </Button>
        </ButtonWrapper>
      </MyCardActions>
    </Card>
  );
})

KidProfile.displayName = 'KidProfile';
